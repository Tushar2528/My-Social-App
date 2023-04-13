const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req, res){

    Post.findById(req.body.post)
    .then(function(post){
        if (post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            })
            .then(function(comment){
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            })
            .catch(function(err){
                console.log('Error : ',err);
            });
        }
    })
    .catch(function(err){
        console.log('Error', err);
    });

}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id)
    .then(function(comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            Comment.findByIdAndRemove(req.params.id);

            Post.findByIdAndUpdate(postId, { $pull : {comments : req.params.id}})
            .then(function(post){
                return res.redirect('back')
            });
        }
        else{
            return res.redirect('back');
        }
    });
}