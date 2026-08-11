const Songs = require('../../models').Song;

exports.songList = (req, res) => {
    return Songs.findAll()
        .then( songs => {
            if(songs.length <= 0) {
                res.status(404).send({error: "No Songs Found"});
            } else {
                res.status(200).send(songs)
            }
        })
        .catch(error => {
            res.status(400).send(error);
        })
}

exports.findSong = (req, res ) => {
    return Songs.findOne({
        where: {
            title: req.params.title
        }
    })
    .then( song => {
        if(!song) {
            res.status(404).send({error: "No Song Found", params: req.params});
        } else {
            res.status(200).send(song)
        }
    })
    .catch(error => {
        res.status(400).send(error);
    })
}

exports.addSong = (req, res) => {
    return Songs.create({
        title: req.body.title,
        album: req.body.album,
        storytags: req.body.storytags
    })
    .then(song => {
        res.status(201).send(song);
    })
    .catch(error => {
        res.status(500).send(error);
    })
}




