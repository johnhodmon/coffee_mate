var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
module.exports=router;
mongoose.connect('mongodb://localhost:27017/coffee_mate');
var db=mongoose.connection;
var Coffee=require('../model/coffees');

db.on('error',function(err){
    console.log('connection error', err);
});

db.once('open', function(){
    console.log('connected to database');
});

router.getAll=( function(req,res){

    Coffee.find(function(err, coffees)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.json(coffees);
        }

    });



});

router.getSingleCoffee=(function(req,res)
{
    Coffee.find({"_id":req.params.id},function(err, coffee){
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.json(coffee);
        }
    });
});

router.updateCoffee=(function(req,res)
{
    Coffee.findById(req.params.id,function(err,coffee){

        if(err)
        {
            res.send(err);
        }

        else
        {
            coffee.stars=req.body.stars;
            coffee.favourite=req.body.favourite;
            coffee.save(function(err){
                if(err)
                {
                    res.send(err)
                }

                else
                {
                    res.json({message:"Coffee updated",data:coffee});
                }
            });
        }

    });

});

router.addCoffee=(function(req,res)
{
    var coffee=new Coffee();
    coffee.name=req.body.name;
    coffee.coffee_shop=req.body.coffee_shop;
    coffee.price=req.body.price;

    coffee.save(function(err)
    {
        if(err)
        {
            res.send(err);

        }

        else
        {
            res.json({message:"Coffee added",data:coffee});
        }
    });


});

router.deleteCoffee=(function(req,res)
{
    Coffee.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.json({message:"Coffee deleted"});
        }
    }

    );
});




module.exports=router;