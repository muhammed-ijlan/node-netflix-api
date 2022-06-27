const router = require("express").Router();
const Movie = require("../models/Movie");
const User = require("../models/User");
const verify = require("../verifyToken");

//Create Movie
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)

        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie)

        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("You are not allowed to add movie");
    }
});

//Update Movie
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedMovie)

        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("You are not allowed to Update movie");
    }
});

//Delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findOneAndDelete(req.params.id)

            res.status(201).json("Movie has been deleted")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("You cant delete Movies")
    }
})

//GEt movie
router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.status(201).json(movie)
    } catch (err) {
        res.status(403).json(err)
    }
})


//Get Random Movie
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])

        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }

        res.status(200).json(movie)

    } catch (err) {
        res.status(403).json("err")
    }
})

//Get All Movies
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(201).json(movies.reverse())
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("You cant delete Movies")
    }
})

module.exports = router;
