const { validationResult } = require("express-validator"); //⬅︎ Module for validation checks

// When err occurs on Validation checks
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ // isEmpty → No err, !isEmpty → err
        return res.status(400).json({errors: errors.array()});
    } 
    next(); // Telling "go to next" (Every middleware needs this)
};