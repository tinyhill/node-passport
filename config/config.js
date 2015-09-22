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
    db: 'mongodb://root:HyNmt8JFAf8fXCTg@localhost:27017/yougedi-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'passport'
    },
    port: 3001,
    db: 'mongodb://root:HyNmt8JFAf8fXCTg@localhost:27017/yougedi-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'passport'
    },
    port: 3001,
    db: 'mongodb://root:HyNmt8JFAf8fXCTg@localhost:27017/yougedi-production'
  }
};

module.exports = config[env];
