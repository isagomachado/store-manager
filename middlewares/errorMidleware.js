const errorMidleware = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'InvalidIdError': res.status(400).json({ message }); break;
    // case 'NotFoundError': res.status(404).json({ message }); break;
    default: res.sendStatus(500);
  }
};

module.exports = errorMidleware;