let resErrors = require(process.cwd() + '/api/helpers/res-errors');


exports.findProfile = async (req, res) =>  {
    let user_id = req.payload.id;
    res.json({ "data":  "user_data"});
}

exports.updateProfile = async (req, res) =>  {
    let user_id = req.payload.id;

    res.json({ "infos":  "profile updated"});
}