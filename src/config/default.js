module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_URL || 'http://localhost:3001/api',
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Sitename',
    defaultTitle: 'Sitename',
    titleTemplate: '%s - Sitename',
    meta: [
      {
        name: 'description',
        content: 'Sitename'
      }
    ]
  }
};
