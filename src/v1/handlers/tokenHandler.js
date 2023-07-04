const JWT = require("jsonwebtoken");
const User = require("../models/user");

//Verify the JWT from client
const tokenDecode = (req) => {
    const bearerHeader = req.headers["authorization"];
    // ⬆︎The field of authorization is like below...
    // "authorization": bearer token
    //                  ⬆bearerHeader
    // To get only "token" from the bearerHeader,
    // use "split()" function to split them into array,
    // then get the arr[1].
    
    if(bearerHeader){
        const bearer = bearerHeader.split(" ")[1];
        try {
            const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
            return decodedToken;
        } catch {
            return false;
        }
    } else {
        return false;
    }
};

//Middleware for JWT verification
exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);

    //If tokenDecoded exists, find the exact JWT
    if(tokenDecoded){
        const user = await User.findById(tokenDecoded.id);
        //⬆︎ When encode the token: encoded with id.
        // Thus, decoded token must include the original id.
        // → findById

        //When user doesn't exist: err message
        if(!user){
            return res.status(401).json("Not authorized");
        }

        //When user exists: update
        req.user = user;
        next();
    } else {
        return res.status(401).json("Not authorized");
    }
};