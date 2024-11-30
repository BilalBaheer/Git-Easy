const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  completedLessons: [{
    lessonId: {
      type: String,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number,
      min: 0,
      max: 100
    }
  }],
  practiceExercises: [{
    exerciseId: {
      type: String,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress'],
      default: 'in-progress'
    }
  }],
  visualizerSessions: [{
    sessionId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    commands: [{
      command: String,
      timestamp: Date
    }]
  }],
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for faster queries
progressSchema.index({ userId: 1 });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
