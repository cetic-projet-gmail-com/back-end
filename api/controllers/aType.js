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
                return {aTypes:[]}
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(aTypes);
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
                return { aType: aType };
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
    res.status(200).json(aType);
}