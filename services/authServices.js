import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (data) => {
    const { name, email, cpf, password, phoneNumber, role, age, active } = data;

    if (!name || !email || !cpf || !password || !phoneNumber || !age) {
        throw new Error("name, email, cpf, password, phone number, and age are required.");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error("A user with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        cpf,
        password: hashedPassword,
        phoneNumber,
        role: role || "user",
        age,
        active: active || true
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        phoneNumber: user.phoneNumber,
        role: user.role,
        active: user.active,
    };
};

const login = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (!user.active) {
        throw new Error(" Inactive user");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
        throw new Error("Invalid password")
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    )

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phoneNumber: user.phoneNumber,
            role: user.role,
            active: user.active,
        },
        token,
    };
}

export default {
    register,
    login,
};