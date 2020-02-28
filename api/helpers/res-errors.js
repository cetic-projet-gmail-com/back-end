
module.exports = async (req, res, err) => {
    res.status(422).json({
        infos:{
            method: req.method,
            source: req.originalUrl,
        },
        errors: err ? err: "an error occured"

    });
}
