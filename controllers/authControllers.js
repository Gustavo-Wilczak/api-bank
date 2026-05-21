import authService from "../services/aurhService.js"

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({
            message: "Usuário registrado com sucesso",
            data: user,
        })
    }catch (error) {
        next(error)

    }
}