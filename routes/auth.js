const router = require("express").Router();
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")

const User = require('../models/User')

//Register
router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    })

    try {
        const user = await newUser.save()
        res.status(201).json(user)

    } catch (err) {
        res.status(500).json(err)
    }

})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json("Wrong username or Password!")
        }

        const bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8)

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong username or Password!")
        }

        //JWT token creation
        const accessToken = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        }, process.env.SECRET_KEY, { expiresIn: '5d' })

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken })

    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router