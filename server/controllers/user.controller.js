import { User } from "../models/userModel";


export const signUp = async (req, res) => {
    const {firstName, lastName, email, password, bio } = req.body;

    try {
        const existingUser = await User.findOne(({email}));

        if (existingUser) {
            return res.status(400).json({
                message: "User Already Exits"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const userDetails = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword
        })

        res.status(201).json({
            message: "User Signed Up Successfully",
            response: userDetails
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error Singin Up, Please Try after some time"
        })
    }
}


export const signIn = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        const isMatch = await bcryp.compare(password, user.password);
        if (!isMatch) {
            return res.statu(400).json({
                message: "Invalid Email or Password"
            })
        }

        const token = generateToken();

        res.status(200).json({
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

    }
}