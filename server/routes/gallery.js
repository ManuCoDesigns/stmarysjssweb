import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Gallery from '../models/Gallery.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'server/uploads/gallery';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { category, type, search, featured } = req.query;
    const filter = { isPublic: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (type && type !== 'All') {
      if (type === 'Photos') filter.type = 'image';
      if (type === 'Videos') filter.type = 'video';
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const galleryItems = await Gallery.find(filter)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(galleryItems);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Failed to fetch gallery items', error: error.message });
  }
});

// Get single gallery item
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id)
      .populate('uploadedBy', 'name');

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Increment views
    galleryItem.views += 1;
    await galleryItem.save();

    res.json(galleryItem);
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({ message: 'Failed to fetch gallery item', error: error.message });
  }
});

// Upload new media
router.post('/upload', authenticate, authorize('admin', 'teacher'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, description, category } = req.body;

    const galleryItem = new Gallery({
      title,
      description,
      type: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      url: `/uploads/gallery/${req.file.filename}`,
      size: req.file.size,
      category,
      uploadedBy: req.user._id
    });

    await galleryItem.save();

    const populatedItem = await Gallery.findById(galleryItem._id)
      .populate('uploadedBy', 'name');

    res.status(201).json({
      message: 'Media uploaded successfully',
      galleryItem: populatedItem
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Update gallery item
router.put('/:id', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { title, description, category, featured } = req.body;

    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Check if user owns the item or is admin
    if (galleryItem.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, description, category, featured },
      { new: true, runValidators: true }
    ).populate('uploadedBy', 'name');

    res.json({
      message: 'Gallery item updated successfully',
      galleryItem: updatedItem
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

// Delete gallery item
router.delete('/:id', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Check if user owns the item or is admin
    if (galleryItem.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete file from filesystem
    if (fs.existsSync(galleryItem.path)) {
      fs.unlinkSync(galleryItem.path);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

// Increment download count
router.post('/:id/download', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    galleryItem.downloads += 1;
    await galleryItem.save();

    res.json({ message: 'Download count updated' });
  } catch (error) {
    console.error('Download count error:', error);
    res.status(500).json({ message: 'Failed to update download count', error: error.message });
  }
});

export default router;