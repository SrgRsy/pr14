const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const handleAuthError = (res) => {
    res.status(401).send({ message: 'Авторизуйтесь' });
  };

  const extractBearerToken = (header) => {
    return header.replace('Bearer ', '');
  };
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  next();
};



