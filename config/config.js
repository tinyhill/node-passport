var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'passport-yougedi-com'
    },
    port: 3000,
    db: 'mongodb://localhost/passport-yougedi-com-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'passport-yougedi-com'
    },
    port: 3000,
    db: 'mongodb://localhost/passport-yougedi-com-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'passport-yougedi-com'
    },
    port: 3000,
    db: 'mongodb://localhost/passport-yougedi-com-production'
  }
};

module.exports = config[env];
