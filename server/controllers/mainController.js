class MainController {
  async get(req, res) {
    return res.status(200).send('The Crawler School API 2022');
  }
}

module.exports = new MainController();
