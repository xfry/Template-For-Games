//controllers/main

module.exports.home = function(req, res) {
  res.render('index', {title: "The Game"});
}