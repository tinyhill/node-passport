var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'passport'
    },
    port: 3001,
    db: 'mongodb://127.0.0.1/passport-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'passport'
    },
    port: 3001,
    db: 'mongodb://127.0.0.1/passport-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'passport'
    },
    port: 3001,
    db: 'mongodb://127.0.0.1/passport-production'
  }
};

module.exports = config[env];
