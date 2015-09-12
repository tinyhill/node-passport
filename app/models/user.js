var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    mobile: String,
    gender: String,
    province: String,
    city: String,
    role: String,
    status: String,
    qq_id: String,
    qq_figureurl: String,
    wx_openid: String,
    wechat_headimgurl: String,
    wechat_unionid: String,
    weibo_id: String,
    weibo_profile_image_url: String
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
