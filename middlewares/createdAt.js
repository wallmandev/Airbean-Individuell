// createdAt.js
const createdAt = (req, res, next) => {
    req.body.createdAt = new Date().toISOString();
    next();
}

export default createdAt