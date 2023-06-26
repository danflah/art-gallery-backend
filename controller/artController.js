const Art = require("../models/Art");
const Artist = require("../models/Artist");

exports.getArts = async(req, res) => {
    const arts = await Art.find({})
    .populate("artist", { Artist });
    res.status(200).json({arts: arts.reverse()});
};

exports.addArt = async(req, res) => {
    const { 
        artName,
        artImage,
        artType,
        artist
    } = req.body;

    const _art = new Art({
        artName,
        artImage,
        artType,
        artist
    })
    _art.save( async(err, art) => {
        if (err) {
            return res.status(400).json({
                message: "Something went wrong",
                err
            });
        }

        if (art) {
            return res.status(201).json({
                success: true,
                message: "Art created successfully",
            });
        }
    })
   
};


