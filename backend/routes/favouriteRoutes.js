const express = require('express');
const router = express.Router();
const {
  getFavourites,
  addFavourite,
  deleteFavourite,
  updateFavourite
} = require('../controllers/favouriteController');
const { protect } = require('../middleware/authMiddleware');

// All favourite routes require JWT authentication
router.use(protect);

router.route('/')
  .get(getFavourites)
  .post(addFavourite);

router.route('/:id')
  .delete(deleteFavourite)
  .put(updateFavourite);

module.exports = router;
