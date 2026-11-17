import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function register(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this username or email" });
        }
        console.log("Register User :",req.body)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ username, email, password: hashedPassword, role });
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);

        res.cookie("token", token);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
async function login(req,res) {
    try {
        const { username, email, password, usernameOrEmail } = req.body;
        const loginIdentifier = String(usernameOrEmail || username || email || '').trim();

        if (!loginIdentifier || !password) {
            return res.status(400).json({ message: "Username or email and password are required" });
        }

        const safeUsername = loginIdentifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const safeEmail = loginIdentifier.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const Is_user_Exist = await userModel.findOne({
            $or: [
                { username: { $regex: `^${safeUsername}$`, $options: 'i' } },
                { email: { $regex: `^${safeEmail}$`, $options: 'i' } }
            ]
        });

        if(!Is_user_Exist){
             return res.status(400).json({ message: "User does not exist" });
        }
            console.log('login body:', req.body);
        const IsValidPass = await bcrypt.compare(password, Is_user_Exist.password);
        if(!IsValidPass){
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: Is_user_Exist._id, role: Is_user_Exist.role }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({ message: "User logged in successfully", user: Is_user_Exist });
    }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
   }
}


export default { register,login };