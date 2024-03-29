function getUserLogin(req, res) {
    if (req.isAuthenticated) {
        console.log("Redirecting to the app...");
        return res.status(200).redirect('https://rahulpanchal0106.github.io/25React/');
    } else {
        console.log("User not authenticated. Redirecting to login page...");
        return res.status(401).redirect('/userLogin');
    }
}

module.exports = getUserLogin;
