// modifiedAt.js
const modifiedAt = (req, res, next) => {
    req.body.modifiedAt = new Date().toISOString();
    next();
};

export default modifiedAt;