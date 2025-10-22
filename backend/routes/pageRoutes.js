const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createPage,
  getAllPages,
  getPageBySlug,
  updatePage,
  deletePage
} = require('../controllers/pageController');

const router = express.Router();

// public
router.get('/', getAllPages);
router.get('/:slug', getPageBySlug);

// admin
router.use(protect);
router.post('/', createPage);
router.patch('/:id', updatePage);
router.delete('/:id', deletePage);

module.exports = router;
