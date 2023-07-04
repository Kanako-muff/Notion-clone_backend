const CryptoJS = require("crypto-js"); //⬅︎ Library for PW encryption
const JWT = require("jsonwebtoken");
const User = require("../models/user"); //⬅︎ schema


// Setting the combination of username and password
exports.register = async (req, res) => {
    const password = req.body.password;
    console.log(req.body.password);

    try {
        // Encrypt the PW with crypto-js
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
        // Sign UP
        const user = await User.create(req.body);
        // Provide JWT
        const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });
        return res.status(200).json({user, token});
    } catch (err) {
        return res.status(500).json(err);
    }
};


//API for Sign IN
exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {
        //Find the username out of the DB
        const user = await User.findOne({username}).select("password username");
        if(!user){
            return res.status(401).json({
                errors: [
                  {
                    param: "username",
                    msg: "Username or password is wrong.",
                  },
                ],
            });              
        }

        //Validate PW
        const decryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY,
        ).toString(CryptoJS.enc.Utf8); // Change decryptedPassword into String
        
        if(decryptedPassword !== password){
            return res.status(401).json({
                errors: [
                  {
                    param: "password",
                    msg: "Username or password is wrong.",
                  },
                ],
            });  
        }

        // Provide JWT
        const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });
        return res.status(201).json({user, token})


    } catch (error) {
        return res.status(500).json(err);
    }
}