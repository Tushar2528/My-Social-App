
const Post = require('../models/post');

module.exports.home =  function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     console.log(posts);
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });
    // const posts = await Post.find({});
    // const post = await posts.populate('user').execPopulate();
    // console.log(post);
    // populate the user of each post
    //  Post.find({}).populate('user').exec(function(err, posts){
    //     console.log(posts);
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // })



// module.exports.actionName = function(req, res){}


// const Post = require('../models/post');

// // module.exports.home =async function(req, res){
   
// //     try{
// //         let posts = await Post.find({}).populate('user').exec();

// //         if (posts){
// //             return res.render('home', {
// //                 title : Codial | Home,
// //                 posts : posts
// //             });
// //         }
// //     }
// //     catch{
// //         console.log('Error');
// //         return;
// //     }

// module.exports.home = function(req,res){
  

//     Post.find({}).populate('user').exec(function(err, posts){
//         return res.render('home', {
//             title : 'Codeial | Home',
//             posts : posts
//         });
//     })
    // Post.find({}).populate('user')
    // .then(function(posts){
    //     return res.render('home', {
    //         title : 'Codeial | Home',
    //         posts : posts,
    //     })
    // .catch(function(err){
        
    // });
    
    // });
    Post.find({}).populate('user')
    .then((posts) => {
        console.log(posts);
        return res.render('home', {
                title : 'Codeial | Home',
                posts : posts,
        });

    })
    .catch((err) => {
        console.log("Error", err);
    });


//     // res.cookie('user_id', 25);
//     // return res.render('home', {
//     //     title : 'Home',
//     // });
// };

}