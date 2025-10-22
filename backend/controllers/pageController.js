const Page = require('../models/Page');

// CREATE PAGE
exports.createPage = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      heroDescription,
      sections,
      tableOfContents,
      faq,
      relatedTopics,
      status
    } = req.body;

    const page = await Page.create({
      title,
      subtitle,
      description,
      heroDescription,
      sections,
      tableOfContents,
      faq,
      relatedTopics,
      status,
      createdBy: req.user?.id
    });

    res.status(201).json({
      status: 'success',
      message: 'Page created successfully',
      data: { page }
    });
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET ALL PAGES
exports.getAllPages = async (req, res) => {
  try {
    let filter = { status: 'published' };
    if (req.user && req.user.role === 'admin') {
      filter = {}; // Admin can see all
    }

    const pages = await Page.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: pages.length,
      data: { pages }
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET PAGE BY SLUG
exports.getPageBySlug = async (req, res) => {
    console.log(req.params.slug)
  try {
    const page = await Page.findOne({
      slug: req.params.slug,
      status: 'published'
    });

    console.log(page)
    if (!page) {
      return res.status(404).json({
        status: 'fail',
        message: 'No page found with that slug'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { page }
    });
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// UPDATE PAGE
exports.updatePage = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      heroDescription,
      sections,
      tableOfContents,
      faq,
      relatedTopics,
      status
    } = req.body;

    const page = await Page.findByIdAndUpdate(
      req.params.id,
      {
        title,
        subtitle,
        description,
        heroDescription,
        sections,
        tableOfContents,
        faq,
        relatedTopics,
        status
      },
      { new: true, runValidators: true }
    );

    if (!page) {
      return res.status(404).json({
        status: 'fail',
        message: 'No page found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Page updated successfully',
      data: { page }
    });
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// DELETE PAGE
exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);

    if (!page) {
      return res.status(404).json({
        status: 'fail',
        message: 'No page found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      message: 'Page deleted successfully',
      data: null
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
