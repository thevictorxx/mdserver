const category = (req, res) => {
  res.render("category");
};

const postCategory = (req, res) => {
  res.json("Subido");
};

module.exports = {
  category,
  postCategory,
};
