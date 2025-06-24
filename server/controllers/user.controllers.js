import { User } from "../models/user.model.js";


export const signUp = async (req, res) => {
    const {firstName, lastName, email, password, bio } = req.body;

    try {
        const existingUser = await User.findOne(({email}));

        if (existingUser) {
            return res.status(400).json({
                message: "User Already Exists"
            })
        }

        const userDetails = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            bio: bio
        })

        res.status(201).json({
            message: "User Signed Up Successfully",
            response: userDetails._id
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
        if (!isMatch || isMatch === "None") {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        const token = await user.generateToken();
        if (token === "None") {
            console.log("Error in generating token");
        }

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


export const logOut = async (req, res) => {
    
    try {
        return res.status(200)
        .cookie("token", "", {
            // expires the token after 2 minutes of logout route hit
            // expires: new Date(Date.now() + 2 * 60* 1000),
            expires: new Date(0),
            httpOnly: true,
            secure: true
        })
        .json({
            message: "User Signed Out Successfully",
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
} 




