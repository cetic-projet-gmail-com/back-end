const Role = require('../models/user')

exports.find = async (req, res) => {
    try{
        let role = await Role.findAll();
        res.json({data:{roles: [role]}})
    } catch(e) {
        res.status(500).json({error : {message: e.message}})
    }
}