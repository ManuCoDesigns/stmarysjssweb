const express = require('express');
const Event = require('../models/Event');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all events
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status, month, year } = req.query;
    
    let query = { isPublic: true };
    
    if (type) query.type = type;
    if (status) query.status = status;
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.startDate = { $gte: startDate, $lte: endDate };
    }
    
    const events = await Event.find(query)
      .populate('organizer', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ startDate: 1 });

    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      events,
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

// Get event by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'firstName lastName email phone')
      .populate('participants.registeredParticipants.user', 'firstName lastName email');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new event
router.post('/', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const {
      title, description, type, startDate, endDate, startTime, endTime,
      venue, participants, requirements, registrationRequired, registrationDeadline
    } = req.body;

    const event = new Event({
      title,
      description,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      venue,
      organizer: req.user.userId,
      participants,
      requirements,
      registrationRequired,
      registrationDeadline
    });

    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('organizer', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: populatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update event
router.put('/:id', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is organizer or admin
    if (event.organizer.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('organizer', 'firstName lastName');

    res.json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Register for event
router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (!event.registrationRequired) {
      return res.status(400).json({
        success: false,
        message: 'Registration not required for this event'
      });
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed'
      });
    }

    // Check if already registered
    const alreadyRegistered = event.participants.registeredParticipants.some(
      participant => participant.user.toString() === req.user.userId
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event'
      });
    }

    // Check max participants
    if (event.participants.maxParticipants && 
        event.participants.registeredParticipants.length >= event.participants.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    event.participants.registeredParticipants.push({
      user: req.user.userId,
      registrationDate: new Date(),
      status: 'registered'
    });

    await event.save();

    res.json({
      success: true,
      message: 'Successfully registered for event',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Cancel registration
router.delete('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    event.participants.registeredParticipants = event.participants.registeredParticipants.filter(
      participant => participant.user.toString() !== req.user.userId
    );

    await event.save();

    res.json({
      success: true,
      message: 'Registration cancelled successfully',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update event status
router.patch('/:id/status', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const { status } = req.body;
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is organizer or admin
    if (event.organizer.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }

    event.status = status;
    await event.save();

    res.json({
      success: true,
      message: 'Event status updated successfully',
      event
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