function getUserLogin(req, res) {
    if (req.isAuthenticated) {
        console.log("Redirecting to the app...");
        return res.redirect('https://github.com/rahulpanchal0106');
    } else {
        console.log("User not authenticated. Redirecting to login page...");
        return res.redirect('/userLogin');
    }
}

module.exports = getUserLogin;
