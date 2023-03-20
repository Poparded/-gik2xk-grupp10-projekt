const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');

const constraints = {
  title: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: '^Titeln måste vara minst %{count} tecken lång.',
      tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
    }
  }
};

router.get('/', (req, res) => {
  db.product.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/id:/addTocart', (req, res) => {
  const product = req.body;
  const invalidData = req.body
  //const invalidData = validate(post, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.product.create(product).then((result) => {
      res.send(result);
    });
  }
});


router.post('/id:/addrating', (req, res) => {
  const product = req.body;
  const invalidData = req.body
  //const invalidData = validate(post, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.product.create(product).then((result) => {
      res.send(result);
    });
  }
});


router.put('/', (req, res) => {
  const produkt = req.body;
  const invalidData = validate(produkt, constraints);
  const id = produkt.id;
  if (invalidData || !id) {
    res.status(400).json(invalidData || 'Id är obligatoriskt.');
  } else {
    db.produkt
      .update(produkt, {
        where: { id: produkt.id }
      })
      .then((result) => {
        res.send('Inlägget har uppdaterats.');
      });
  }
});
router.delete('/:id', (req, res) => {
  db.produkt
    .destroy({
      where: { id: req.params.id }
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
