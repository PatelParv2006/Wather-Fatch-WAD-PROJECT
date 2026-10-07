const FavouriteCity = require('../models/FavouriteCity');

/**
 * @desc    Get all favourite cities of logged-in user
 * @route   GET /api/favourites
 * @access  Private
 */
const getFavourites = async (req, res, next) => {
  try {
    // Only fetch favourites belonging to the authenticated user
    const favourites = await FavouriteCity.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favourites.length,
      message: 'Favourites fetched successfully',
      data: favourites
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a city to logged-in user's favourites
 * @route   POST /api/favourites
 * @access  Private
 */
const addFavourite = async (req, res, next) => {
  try {
    const { cityName, country, state, latitude, longitude } = req.body;

    if (!cityName || cityName.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'City name is required'
      });
    }

    const trimmedCity = cityName.trim();

    // Check if city already exists in this user's favourites (case-insensitive)
    const existing = await FavouriteCity.findOne({
      user: req.user._id,
      cityName: { $regex: new RegExp(`^${trimmedCity}$`, 'i') }
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `${trimmedCity} is already in your favourites`
      });
    }

    const favourite = await FavouriteCity.create({
      user: req.user._id,
      cityName: trimmedCity,
      country: country ? country.trim() : '',
      state: state ? state.trim() : '',
      latitude: latitude || null,
      longitude: longitude || null
    });

    res.status(201).json({
      success: true,
      message: `${trimmedCity} added to favourites successfully`,
      data: favourite
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove a favourite city by ID
 * @route   DELETE /api/favourites/:id
 * @access  Private
 */
const deleteFavourite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const favourite = await FavouriteCity.findById(id);

    if (!favourite) {
      return res.status(404).json({
        success: false,
        message: 'Favourite city not found'
      });
    }

    // Verify ownership: User A must never delete User B's favourite
    if (favourite.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to delete this favourite city'
      });
    }

    await favourite.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Favourite city removed successfully',
      data: { id }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a favourite city details
 * @route   PUT /api/favourites/:id
 * @access  Private
 */
const updateFavourite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cityName, country, state } = req.body;

    const favourite = await FavouriteCity.findById(id);

    if (!favourite) {
      return res.status(404).json({
        success: false,
        message: 'Favourite city not found'
      });
    }

    // Strict ownership verification
    if (favourite.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to modify this favourite city'
      });
    }

    if (cityName) favourite.cityName = cityName.trim();
    if (country !== undefined) favourite.country = country.trim();
    if (state !== undefined) favourite.state = state.trim();

    const updated = await favourite.save();

    res.status(200).json({
      success: true,
      message: 'Favourite city updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavourites,
  addFavourite,
  deleteFavourite,
  updateFavourite
};
