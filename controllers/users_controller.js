const User = require('../models/users')

module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .then(function(user){
        res.render('user_profile', {
            title : "User page",
            profile_user : user
        });
    });


    
};

module.exports.update = function(req, res){

    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body)
        .then(function(user){
            return res.redirect('back')
        })
    } 
    else{
        return res.status(401).send('Unauthorized');
    }
};

// Render the sign up page
module.exports.signUp = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title : 'Codeial | Sign up'
    });
};

// Render the sign In page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title :'Codeial | sign in'
    });
};



// Get the sign up data

module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email :req.body.email})
    .catch(function(err){
        console.log("Error in finding the user");
    })
    .then(function(user){
        if (!user){
            User.create(req.body)
            .then(function(){
                return res.redirect('/users/sign-in');
            })
            .catch(function(err){
                console.log("Error in creating user!");
            });
        }
        else{
            return res.redirect('back');
        }
    });
};


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success',"You have logged-out");
        res.redirect('/');
      });


      
    // req.logout();
    // req.flash('success', 'You have logged out!');


    // return res.redirect('/');
};

// // Sign in and create a session for the user

// module.exports.createSession = function(req, res){
//     req.flash('success', 'Logged in Sccessfully');
    
//     return res.redirect('/');

// }


// module.exports.destroySession = function(req,res){
//     req.logout(function(err){
//         if (err){
//             return next(err);
//         }
        
//     });
//     req.flash('success','You have Logged out!');
//     return res.redirect('/');
// }