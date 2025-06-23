import { User } from "../models/user.model";


export const signUp = async (req, res) => {
    const {firstName, lastName, email, password, bio } = req.body;

    try {
        const existingUser = await User.findOne(({email}));

        if (existingUser) {
            return res.status(400).json({
                message: "User Already Exits"
            })
        }

        const userDetails = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            bio: bio
        })

        res.status(201).json({
            message: "User Signed Up Successfully",
            response: userDetails
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error Singin Up, Please Try after some time."
        })
    }
}


export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password"
        })
    }
    
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.statu(400).json({
                message: "Invalid Email or Password"
            })
        }

        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        const token = user.generateToken();

        res.status(200)
        .setHeader("Authorization", `Bearer ${token}`)
        .cookie("token", token, option)
        .json({
            message: "Login Successful",
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: token
            }
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error Login In, Please Try after some time."
        })
    }
}