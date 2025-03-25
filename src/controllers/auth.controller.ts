import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const userRepository = getRepository(User);

        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(newUser);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Error during registration", error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.SECRET_KEY!, 
            { expiresIn: "1h" } 
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        return res.status(500).json({ message: "Error during login", error });
    }
};
