const mongoose = require('mongoose');

const favouriteCitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    cityName: {
      type: String,
      required: [true, 'City name is required'],
      trim: true
    },
    country: {
      type: String,
      trim: true,
      default: ''
    },
    state: {
      type: String,
      trim: true,
      default: ''
    },
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate favorite cities per user
favouriteCitySchema.index({ user: 1, cityName: 1 }, { unique: true });

const FavouriteCity = mongoose.model('FavouriteCity', favouriteCitySchema);

module.exports = FavouriteCity;
