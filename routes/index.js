const express = require('express');
const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.get('/', (req, res) => {
  res.render('index', { title: "Mini Message Board", messages: messages });
});

router.get('/new', (req, res) => {
  res.render('form', { title: "New Message" });
});

router.post('/new', (req, res) => {
  const { messageText, messageUser } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/');
});

// Edit route
router.get('/edit/:id', (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];
  if (message) {
    res.render('edit', { title: "Edit Message", message: message, id: messageId });
  } else {
    res.redirect('/');
  }
});

router.post('/edit/:id', (req, res) => {
  const messageId = req.params.id;
  const { messageText, messageUser } = req.body;
  messages[messageId] = { text: messageText, user: messageUser, added: new Date() };
  res.redirect('/');
});

// Delete route
router.post('/delete/:id', (req, res) => {
  const messageId = req.params.id;
  messages.splice(messageId, 1);
  res.redirect('/');
});

// Message details route
router.get('/message/:id', (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];
  if (message) {
    res.render('message', { title: "Message Details", message: message });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
