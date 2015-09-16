var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = new Schema({
    username: String,
    password: String,
    display_name: String,
    avatar: String,
    email: String,
    mobile: String,
    registered: {type: Date, default: Date.now},
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
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
