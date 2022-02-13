import jwt from 'jsonwebtoken';
import ResponseApi from '../ResponseApi';

const response = new ResponseApi();
const decodeToken = (req, res, next, token) => {
  jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
    if (!error) {
      req.token = decode;
      return next();
    }
    return response.sendError(res, 401, 'invalid request token');
  });
};

const authMiddleware = (req, res, next) => {
  let token = req.headers['x-access-token']
      || req.headers.Authorization
      || req.headers.token
      || req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    return decodeToken(req, res, next, token);
  }
  return response.sendError(res, 401, 'please assign a access token as header');
};
export default authMiddleware;
