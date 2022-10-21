function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        if (req.user && res.locals.post.author._id == req.user._id) {
            res.locals.isOwner = true;
            next();
        } else {
            res.redirect('/404');
        }
    }
}

module.exports = { hasUser, isGuest, isOwner }