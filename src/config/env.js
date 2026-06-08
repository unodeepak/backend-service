module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/nodeApp",
  
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  
  ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
