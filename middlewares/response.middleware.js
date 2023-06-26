const responseMiddleware = (req, res, next) => {
  console.log(res.statusCode);
  switch (res.statusCode) {
    case 200:
    case 400:
    case 404:
      res.json(res.data);
      break;
    default:
      break;
  }
};

export { responseMiddleware };
