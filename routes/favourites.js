var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
module.exports=router;
var Favourite=require('../model/favourites');

router.getAll=( function(req,res){

    Favourite.find(function(err, favourites)
    {
        if(err)
        {
            res.json({message:'No Favourites found',errmsg:err})
        }

        else
        {
            res.json(favourites);
        }

    });



});

router.addFavourite=(function(req,res)
{
    var favourite=new Favourite();
    favourite.email=req.body.email;
    favourite.coffee=req.body.coffee;


    favourite.save(function(err)
    {
        if(err)
        {
            res.send(err);

        }

        else
        {
            res.json({message:"Favourite added",data:favourite});
        }
    });


});

router.findUserFavourites=(function(req, res)

{
    var email=req.params.email;

    Favourite.find({ 'email': email },function(err,favourites)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.json(favourites);
        }

    });
})

router.findCoffeeInUserFavourites=(function(req, res)

{


    Favourite.find({ 'email': email,'coffee._id':coffee_id },function(err,favourites)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.json(favourites);
        }

    });
})

router.deleteFavourite=(function(req,res)
{
    Favourite.findByIdAndRemove(req.params.id,function(err)
        {
            if(err)
            {
                res.send(err);
            }

            else
            {
                res.json({message:"Favourite deleted"});
            }
        }

    );
});
