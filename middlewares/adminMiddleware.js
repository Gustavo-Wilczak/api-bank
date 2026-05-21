const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            error: "acesso negado"
        })
    }
    next();
}

export default adminMiddleware;