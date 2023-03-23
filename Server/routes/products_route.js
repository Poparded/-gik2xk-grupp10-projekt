const productService = require("../services/productService");
const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");



router.get("/", (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  }).catch((error) => {
    res.status(500).json(error);
  });
});
router.get("/:id", (req, res) => {
  id = req.params.id

  productService.getProductById(id).then((result) => {
    res.status(result.status).json(result.data)
  }).catch((error) => {
    res.status(500).json(error)
  })
})
// Product request to create a new post
router.post('/', (req, res) => {
  const product = req.body; // Get post data from the request body

  productService.addProduct(product).then((result) => { // Call postService.create method with post as parameter
    res.status(result.status).json(result.data); // Send the response with the status and data received from postService.create
  });
});

router.post('/:id/addRating', (req, res) => {
  const rating = req.body; // Get post data from the request body
  const id = req.params.id
  console.log(rating);
  productService.addRating(id, rating).then((result) => { // Call postService.create method with post as parameter
    res.status(result.status).json(result.data); // Send the response with the status and data received from postService.create
  });
});


router.delete('/', (req, res) => {
  const id = req.body.id; // Get the id from the request body
  if (!id) {
    console.log("You need a id!");

  }
  productService.destroy(id).then((result) => { // Call postService.destroy method with id as parameter
    res.status(result.status).json(result.data); // Send the response with the status and data received from postService.destroy
  });
});
















router.post("/:id/addRating", (req, res) => {
  const rating = req.body.rating;
  if (rating) {
    db.product
      .findByPk(req.params.id)
      .then((product) => {
        if (!product) {
          res
            .status(404)
            .json({
              error: `Produkten med ID ${req.params.id} kunde inte hittas`,
            });
        } else {
          const rating = req.body.rating;
          product.update({ rating: rating }).then(() => {
            res.json(
              `Betyget för produkten med ID ${req.params.id} uppdaterades till ${rating}`
            );
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    console.log(nop);
  }
});

router.put("/", (req, res) => {
  const id = req.body.id
  const produkt = req.body;
  productService.update(produkt, id).then((result) => {
    res.status(result.status).json(result.data)
  })
});
router.delete("/:id", (req, res) => {
  db.produkt
    .destroy({
      where: { id: req.params.id },
    })
    .then(() => {
      res.json(`Produkten med ID ${req.params.id} raderades`);
    })
    //kolla om det fanns någon error
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
