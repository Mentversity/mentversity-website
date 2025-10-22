const mongoose = require('mongoose');
const slugify = require('slugify');

// Section schema
const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['hero', 'text', 'image', 'features', 'faq', 'cta', 'custom'],
    default: 'text'
  },
  heading: { type: String },
  subheading: { type: String },
  content: {
    type: [String], // <-- Array of strings for multiple paragraphs
    default: []
  },
  image: { type: String },
  linkText: { type: String },
  linkURL: { type: String },
  order: { type: Number, default: 0 },
  subsections: [this] // <-- Allow recursive subsections
});

// Page schema
const pageSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Page title is required'] },
  slug: { type: String, unique: true },
  subtitle: { type: String },
  description: { type: String },
  heroDescription: { type: String }, // optional field for hero section
  tableOfContents: [
    {
      id: String,
      title: String,
      subsections: [
        {
          id: String,
          title: String
        }
      ]
    }
  ],
  sections: [sectionSchema],
  faq: [
    {
      question: String,
      answer: String
    }
  ],
  relatedTopics: [
    {
      title: String,
      description: String,
      link: String
    }
  ],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

// Slugify before validation
pageSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Update updatedAt on save
pageSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
