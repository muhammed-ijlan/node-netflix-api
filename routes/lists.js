const router = require("express").Router();
const { aggregate } = require("../models/List");
const List = require("../models/List");
const verify = require("../verifyToken");

//Create Movie
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);

        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to add movie");
    }
});

//Delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("Successfully deleted");
        } catch (err) {
            res.status(500);
        }
    } else {
        res.status(403).json("You are not able to perform this action");
    }
});

//Get
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;

    let list = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            }

            list = await List.aggregate([
                { $sample: { size: 10 } },
                { $match: { type: typeQuery } },
            ]);
        } else {
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }

        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Get Random

module.exports = router;
