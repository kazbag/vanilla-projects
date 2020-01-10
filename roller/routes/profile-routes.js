const router = require("express").Router();

router.get("/", (req, res) => {
  res.send(`Witaj w swoim profilu, ${req.user.username}`);
});

module.exports = router;
