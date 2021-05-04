class Images {
  static sendOne = (req, res) => {
    const { rep, img } = req.params;
    res.sendFile(`uploads/${rep}/${img}`, { root: "./" });
  };
}

module.exports = Images;
