/**
 * Created by john on 08/02/16.
 */
var mongoose=require('mongoose');

var CoffeeSchema=new mongoose.Schema({
    name:String,
    coffee_shop:String,
    price:Number,
    stars:{type:Number, default:0},
    user_email:String,
    user_name:String,
    user_img_url:String
});

module.exports=mongoose.model('Coffee',CoffeeSchema);