process.loadEnvFile();
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'defaultSecret', // Default value if environment variable is not set
};
