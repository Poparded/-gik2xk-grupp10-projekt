const router = require("express").Router();
router.get("/", (req, res) => {
    res.send("get products")
})

router.post("/:id/addToCart", (req, res) => {
    res.send(req.body)
})
router.put("/id/addToCart", (req, res) => {
    res.send("put posts")
})
router.delete("/", (req, res) => {
    res.send("Delete posts")
})
module.exports = router;
