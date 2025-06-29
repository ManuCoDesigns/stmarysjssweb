const express = require('express');
const News = require('../models/News');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status = 'published', 
      featured, 
      breaking,
      search,
      tags
    } = req.query;
    
    let query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (featured !== undefined) query.isFeatured = featured === 'true';
    if (breaking !== undefined) query.isBreaking = breaking === 'true';
    if (tags) query.tags = { $in: tags.split(',') };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by expiry date for published articles
    if (status === 'published') {
      query.$or = [
        { expiryDate: { $exists: false } },
        { expiryDate: { $gte: new Date() } }
      ];
    }
    
    const news = await News.find(query)
      .populate('author', 'firstName lastName profileImage')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ isFeatured: -1, publishDate: -1 });

    const total = await News.countDocuments(query);

    res.json({
      success: true,
      news,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get news article by ID or slug
router.get('/:identifier', async (req, res) => {
  try {
    let query;
    
    // Check if identifier is ObjectId or slug
    if (req.params.identifier.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: req.params.identifier };
    } else {
      query = { 'seoData.slug': req.params.identifier };
    }
    
    const article = await News.findOne(query)
      .populate('author', 'firstName lastName profileImage')
      .populate('comments.user', 'firstName lastName profileImage')
      .populate('comments.replies.user', 'firstName lastName profileImage');
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json({
      success: true,
      article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new news article
router.post('/', auth, authorize(['admin', 'teacher']), upload.array('images', 5), async (req, res) => {
  try {
    const {
      title, content, summary, category, tags, status, publishDate, expiryDate,
      priority, isFeatured, isBreaking, targetAudience, seoData
    } = req.body;

    const newsData = {
      title,
      content,
      summary,
      author: req.user.userId,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status,
      publishDate,
      expiryDate,
      priority,
      isFeatured: isFeatured === 'true',
      isBreaking: isBreaking === 'true',
      targetAudience: targetAudience ? targetAudience.split(',') : ['all'],
      seoData: seoData ? JSON.parse(seoData) : {}
    };

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      newsData.images = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        caption: '',
        altText: title
      }));

      // Set first image as featured image
      newsData.featuredImage = newsData.images[0];
    }

    const article = new News(newsData);
    await article.save();

    const populatedArticle = await News.findById(article._id)
      .populate('author', 'firstName lastName profileImage');

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      article: populatedArticle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update news article
router.put('/:id', auth, authorize(['admin', 'teacher']), upload.array('images', 5), async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Check if user is author or admin
    if (article.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this article'
      });
    }

    const updateData = { ...req.body };
    
    if (updateData.tags) {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
    }
    
    if (updateData.targetAudience) {
      updateData.targetAudience = updateData.targetAudience.split(',');
    }

    if (updateData.seoData) {
      updateData.seoData = JSON.parse(updateData.seoData);
    }

    // Handle new file uploads
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        caption: '',
        altText: updateData.title || article.title
      }));

      updateData.images = [...(article.images || []), ...newImages];
      
      // Update featured image if not set
      if (!article.featuredImage && newImages.length > 0) {
        updateData.featuredImage = newImages[0];
      }
    }

    const updatedArticle = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName profileImage');

    res.json({
      success: true,
      message: 'Article updated successfully',
      article: updatedArticle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete news article
router.delete('/:id', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Check if user is author or admin
    if (article.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this article'
      });
    }

    await News.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Like/Unlike article
router.post('/:id/like', auth, async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    const existingLike = article.likes.find(
      like => like.user.toString() === req.user.userId
    );

    if (existingLike) {
      // Unlike
      article.likes = article.likes.filter(
        like => like.user.toString() !== req.user.userId
      );
    } else {
      // Like
      article.likes.push({
        user: req.user.userId,
        timestamp: new Date()
      });
    }

    await article.save();

    res.json({
      success: true,
      message: existingLike ? 'Article unliked' : 'Article liked',
      likesCount: article.likes.length,
      isLiked: !existingLike
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Add comment to article
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const article = await News.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    article.comments.push({
      user: req.user.userId,
      content,
      timestamp: new Date(),
      isApproved: req.user.role === 'admin' || req.user.role === 'teacher'
    });

    await article.save();

    const populatedArticle = await News.findById(article._id)
      .populate('comments.user', 'firstName lastName profileImage');

    const newComment = populatedArticle.comments[populatedArticle.comments.length - 1];

    res.json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Approve/Reject comment
router.patch('/:id/comments/:commentId/approve', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const { isApproved } = req.body;
    
    const article = await News.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    const comment = article.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    comment.isApproved = isApproved;
    await article.save();

    res.json({
      success: true,
      message: `Comment ${isApproved ? 'approved' : 'rejected'} successfully`,
      comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get featured articles
router.get('/featured/articles', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const featuredArticles = await News.find({
      status: 'published',
      isFeatured: true,
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: { $gte: new Date() } }
      ]
    })
    .populate('author', 'firstName lastName profileImage')
    .limit(parseInt(limit))
    .sort({ publishDate: -1 });

    res.json({
      success: true,
      articles: featuredArticles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get breaking news
router.get('/breaking/news', async (req, res) => {
  try {
    const breakingNews = await News.find({
      status: 'published',
      isBreaking: true,
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: { $gte: new Date() } }
      ]
    })
    .populate('author', 'firstName lastName profileImage')
    .sort({ publishDate: -1 })
    .limit(3);

    res.json({
      success: true,
      news: breakingNews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;