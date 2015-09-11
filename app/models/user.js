var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = new Schema({
    username: String,
    password: String,
    qq_id: String,
    qq_nickname: String,
    qq_gender: String,
    qq_province: String,
    qq_city: String,
    qq_year: String,
    qq_figureurl: String,
    wechat_openid: String,
    wechat_nickname: String,
    wechat_sex: String,
    wechat_province: String,
    wechat_city: String,
    wechat_country: String,
    wechat_headimgurl: String,
    wechat_unionid: String
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
