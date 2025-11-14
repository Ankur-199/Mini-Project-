const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [0, 'Budget must be positive']
  },
  status: {
    type: String,
    enum: ['Planning', 'Booked', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Planning'
  },
  travelers: {
    type: Number,
    required: [true, 'Number of travelers is required'],
    min: [1, 'At least 1 traveler is required']
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Validation: End date should be after start date
travelSchema.pre('save', function(next) {
  if (this.endDate < this.startDate) {
    next(new Error('End date must be after start date'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Travel', travelSchema);

