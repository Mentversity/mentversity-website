const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  from: process.env.EMAIL_FROM || 'Mentversity <no-reply@mentversity.com>',
  companyEmail: process.env.COMPANY_EMAIL || 'info@mentversity.com',
};

module.exports = emailConfig;
