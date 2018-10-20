module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_URL || 'http://localhost:3001/api',
  ga: process.env.GA_TRACKING_CODE,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Boilerplate',
    defaultTitle: 'Boilerplate',
    titleTemplate: '%s - Boilerplate',
    meta: [
      {
        name: `Let's build Something`,
        content: 'Boilerplate'
      }
    ]
  }
};
