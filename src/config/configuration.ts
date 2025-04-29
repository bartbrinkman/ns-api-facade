export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nsApi: {
    baseUrl: process.env.NS_API_BASE_URL || 'https://gateway.apiportal.ns.nl',
    apiKey: process.env.NS_API_KEY,
  },
}); 