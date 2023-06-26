const Artist = require("../models/Artist");

exports.getArtists = async(req, res) => {
    const artists = await Artist.find({})
    // .populate("products", { Product });
    res.status(200).json({artists: artists.reverse()});
};

exports.addArtist = async(req, res) => {
    const { 
        artistName,
        artistImage 
    } = req.body;

    const _artist = new Artist({
        artistName,
        artistImage 
    })
    _artist.save( async(err, artist) => {
        if (err) {
            return res.status(400).json({
                message: "Something went wrong",
                err
            });
        }

        if (artist) {
            return res.status(201).json({
                success: true,
                message: "Artist added successfully",
            });
        }
    })
   
};