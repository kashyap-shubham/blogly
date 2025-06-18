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
        
    } catch(error) {

    }
}