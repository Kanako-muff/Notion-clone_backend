const router = require("express").Router();
const { body, validationResult } = require("express-validator"); //⬅︎ Module for validation checks


const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler")

//API for Sign UP
router.post(
    "/register",

    // Validation checks with express-validator
    body("username")
        .isLength({min: 8})
        .withMessage("Username must be at least 8 characters."),
    body("password")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters."),
    body("confirmPassword")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters."),
    body("username").custom((value) => {
        return User.findOne({username: value}).then((user) => {
            if(user){
                return Promise.reject("Username already in use.");
            }
        });
    }),

    // When err occurs on Validation checks
    validation.validate,

    // Setting the combination of username and password
    userController.register,
);


//API for Sign IN
router.post(
    "/login", 

    // Validation checks with express-validator
    body("username")
        .isLength({min: 8})
        .withMessage("Username must be at least 8 characters."),
    body("password")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters."),

    // When err occurs on Validation checks
    validation.validate,
    
    // login
    userController.login
)

//API for JWT authentication
router.post("/verify-token", tokenHandler.verifyToken, (req,res) => {
    return res.status(200).json({user: req.user})
});

module.exports = router;