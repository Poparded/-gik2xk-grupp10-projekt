const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');

const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-postadressen måste vara minst %{count} tecken lång.',
      tooLong: '^E-postadressen får inte vara längre än %{count} tecken lång.'
    },
    email: {
      message: '^E-postadressen är i ett felaktigt format.'
    }
  },
  username: {
    length: {
      minimum: 6,
      maximum: 30,
      tooShort: '^Användarnamnet måste vara minst %{count} tecken långt.',
      tooLong: '^Användarnamnet får inte vara längre än %{count} tecken långt.'
    }
  },
  password: {
    length: {
      minimum: 6,
      maximum: 30,
      tooShort: '^Lösenordet måste vara minst %{count} tecken långt.',
      tooLong: '^Lösenordet får inte vara längre än %{count} tecken långt.'
    }
  },
  first_name: {
    length: {
      minimum: 3,
      maximum: 18,
      tooShort: '^Förnamnet måste vara minst %{count} tecken långt.',
      tooLong: '^Förnamnet får inte vara längre än %{count} tecken långt.'
    }
  },
  last_name: {
    length: {
      minimum: 3,
      maximum: 18,
      tooShort: '^Efternamnet måste vara minst %{count} tecken långt.',
      tooLong: '^Efternamnet får inte vara längre än %{count} tecken långt.'
    }
  }
};
router.get('/', (req, res) => {
  db.users.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.user.create(user).then((result) => {
      res.send(result);
    });
  }
  res.send(req.body)
});

router.put('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  const id = user.id;
  /*if (invalidData || !id) {
    res.status(400).json(invalidData || 'Id är obligatoriskt.');
  } else {
    db.user
      .update(user, {
        where: { id: user.id }
      })
      .then((result) => {
        res.send('Inlägget har uppdaterats.');
      });
  }*/

  console.log(invalidData);
  console.log(id);
  console.log(user);

}

);
router.delete('/', (req, res) => {
  db.user
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Inlägget raderades`);
    });
});

module.exports = router;
