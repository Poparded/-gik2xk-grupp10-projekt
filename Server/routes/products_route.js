const productService = require("../services/productService");
const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");

const constraints_products = {
  title: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: "^Titeln måste vara minst %{count} tecken lång.",
      tooLong: "^Titeln får inte vara längre än %{count} tecken lång.",
    },
  },
};

router.get("/", (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  }).catch((error) => {
    res.status(500).json(error);
  });
});
// Product request to create a new post
router.post('/', (req, res) => {
  const product = req.body; // Get post data from the request body

  productService.addProduct(product).then((result) => { // Call postService.create method with post as parameter
    res.status(result.status).json(result.data); // Send the response with the status and data received from postService.create
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
  const produkt = req.body;
  const invalidData = validate(produkt, constraints);
  const id = produkt.id;
  if (invalidData || !id) {
    res.status(400).json(invalidData || "Id är obligatoriskt.");
  } else {
    db.produkt
      .update(produkt, {
        where: { id: produkt.id },
      })
      .then((result) => {
        res.send("Inlägget har uppdaterats.");
      });
  }
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
