const { Colour } = require(`${process.cwd()}/sequelize`)

exports.find = async (req, res) => {
    let colours = await Colour
        .findAll({
        })
        .then((colours) => {
            if (colours.length > 0) {
                return colours
            } else {
                return {colours:[]}
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json({colours});
}

exports.findById = async (req, res) => {
    let { id } = req.params;
    let colour = await Colour
        .findOne({
            where: { id: id }
        })
        .then((colour) => {
            if (colour) {
                return colour;
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json({colour});
}