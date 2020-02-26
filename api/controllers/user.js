const User = require('../models/user')

exports.findOne = async (req, res) => {
    try{
        let { id } = req.params;
        let user = await User.findOne({id: id});
        res.json({data:{user: [user]}})
    } catch(e) {
        res.status(500).json({error : {message: e.message}})
    }
}