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
        // if (err) {
        //     resErrors(req, res, err)
        //     return;
        // }

        // if (index !== -1) {
            token = generateJwt({id: 1});
            res.status(200);
            res.json({
                "token": token
            });
        // } else {
        //     res.status(401);
        //     res.json({"errors" : info});
        // }
    })(req, res);
}
// module.exports = Router;

function generateJwt(user) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        id: user.id,
        // login: this.login,
        // exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET); 
}