var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');
var timestamp = require('mongoose-timestamp');

var UserSchema = new Schema({
    username: String,
    password: String,
    display_name: String,
    avatar: String,
    email: String,
    mobile: String,
    level: Number,
    activation_key: String,
    status: Number,
    gender: String,
    province: String,
    city: String,
    qq_openid: String,
    wechat_openid: String,
    wechat_unionid: String,
    weibo_id: String
}, {
    collection: 'user'
});

UserSchema
    .plugin(findOrCreate)
    .plugin(timestamp, {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    });

module.exports = mongoose.model('User', UserSchema);
