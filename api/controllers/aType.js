const { AType } = require(`${process.cwd()}/sequelize`)

exports.find = async (req, res) => {
    let aTypes = await AType
        .findAll({
            include: ['activities']
        })
        .then((aTypes) => {
            if (aTypes.length > 0) {
                return { aTypes: aTypes }
            } else {
                return []
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ aTypes });
}

exports.findById = async (req, res) => {
    let { id } = req.params;
    let aType = await AType
        .findOne({
            where: { id: id },
            include: ['activities']
        })
        .then((aType) => {
            if (aType) {
                return aType
            }
        })
        .catch((error) => {
            res.status(422).json({ error });
        })
    res.status(200).json({ aType });
}