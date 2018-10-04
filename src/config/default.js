module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_URL || 'http://localhost:3001/api',
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'AMSalyzer',
    defaultTitle: 'AMSalyzer',
    titleTemplate: '%s - AMSalyzer',
    meta: [
      {
        name: 'Bulk traffic analyzer for websites',
        content: 'AMSalyzer'
      }
    ]
  }
};
