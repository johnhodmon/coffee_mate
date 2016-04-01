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

router.findUserCoffee=(function(req, res)

{
    var email=req.params.email;

    Coffee.find({ 'user_email': email },function(err, coffees)
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
})

router.findUserFavourites=(function(req, res)

{
    var email=req.params.email;

    Coffee.find({ 'user_email': email,'favourite':'glyphicon glyphicon-star gold-star' },function(err, coffees)
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
})

router.getSingleCoffee=function(req,res)
{
    Coffee.find({"_id": req.params.id},function(err,coffee)
    {
        if (err)
        {
            res.json({message:'Coffee NOT found!',errmsg:err})
        }

        else
        {
            res.json(coffee);
        }
    });
};

router.incrementStars = function(req, res)
{
    Coffee.findById(req.params.id,function(err,coffee){
        if(err)
        {
            res.send(err)
        }

        else
        {
            coffee.stars+=1;

            coffee.save(function(err){
                if(err)
                {
                    res.send(err);
                }

                else
                {
                    res.json({message:'Coffee Updated',data:coffee});
                }

            });
        }
    })
};

router.updateCoffee=(function(req,res)
{
    Coffee.findById(req.params.id,function(err,coffee){

        if(err)
        {
            res.send(err);
        }

        else
        {
            coffee.name=req.body.name;
            coffee.coffee_shop=req.body.coffee_shop;
            coffee.price=req.body.price;
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
    coffee.user_name=req.body.user_name;
    coffee.user_email=req.body.user_email;
    coffee.user_img_url=req.body.user_img_url;


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