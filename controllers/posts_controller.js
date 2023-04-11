const Post = require('../models/post');

module.exports.create = function(req, res){
    console.log(req);

    Post.create({
        content : req.body.content,
        user : req.user._id
    })
    .then(function(post){
        return res.redirect('back');
    })
    .catch(function(err){
        if (err){
            console.log('Error in creating the post');
            return;
        }
    });
    // Post.create({
    //     content : req.body.content,
    //     user : req.user_id
    // },function(err, post){
    //     if (err){
    //         console.log('Error in creating a post ');
    //         return;
    //     }

    //     return res.redirect('back');

    // });
}