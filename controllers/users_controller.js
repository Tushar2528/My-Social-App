module.exports.profile = function(req, res){

    res.render('user_profile', {
        title : "User page",
    });
    // res.end("<h1> Profile page </h1>");
};