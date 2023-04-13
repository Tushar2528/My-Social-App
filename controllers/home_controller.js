
const Post = require('../models/post');
const User = require('../models/users');




module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate : {
                path : 'user'
            }
        });

        let users = await User.find({})

        return res.render('home',{
            title : "Codial | Home",
            posts : posts,
            all_users : users
        });
        // return res.status(200).json({
        //     message : 'Home page rendered',
        //     users : users,
        //     all_posts : posts
        // });
    }
    catch(err){
        console.log('Error', err);
        return 

    }
}
// module.exports.home =  function(req, res){

//     Post.find({})
//     .populate('user')
//     .populate({
//         path : 'comments',
//         populate : {
//             path :'user'
//         }
//     })
//     .then((posts) => {
//         // console.log(posts);
//         User.find({})
//         .then(function(users){
//             return res.render('home', {
//                 title : 'Codeial | Home',
//                 posts : posts,
//                 all_users : users
//         });
//         })


//     })
//     .catch((err) => {
//         console.log("Error", err);
//     });
// };