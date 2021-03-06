const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const express= require('express');
const Router = express.Router();
const dotEnv = require('dotenv');
dotEnv.config({ path: `${process.cwd()}/development.env` });
let resErrors = require(`${process.cwd()}/api/helpers/res-errors`);

module.exports = async (req, res) => {
    // user = {id:"user_id"}; 
    passport.authenticate('local', async function (err, user, info) {
        var token;
        if (err) {
            resErrors(req, res, err)
            return;
        }
        if (user) {
            token = generateJwt(user);
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            res.status(401);
            res.json({"errors" : info});
        }
    })(req, res);
}

function generateJwt(user) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.id
        // login: this.login,
        // exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET); 
}