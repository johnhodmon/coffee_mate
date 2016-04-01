var mongoose=require('mongoose');


var FavouriteSchema=new mongoose.Schema({
    coffee:Object,
    email:String
});

module.exports=mongoose.model('Favourite',FavouriteSchema);