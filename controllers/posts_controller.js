const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    // console.log(req);

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

};


// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         // .id means converting the object id into string
//         if (post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }

//     });
// }



module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            await Post.findByIdAndRemove(req.params.id);

            await Comment.deleteMany({post : req.params.id});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error',err);
        return; 
    }
}
// module.exports.destroy = function(req, res){


//     Post.findById(req.params.id)
//     .then(async function(post){
//         // .id means converting the object into string
//         if (post.user == req.user.id){
//             await Post.findByIdAndRemove(req.params.id);

//             Comment.deleteMany({post: req.params.id}).then( function(err){
//                 return res.redirect('back');
//             });

//         }
//         else{
//             return res.redirect('back');
//         }
//     })
// };