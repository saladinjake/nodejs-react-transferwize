import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Utils = {
  validatePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  },
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(15);
    const pwd = bcrypt.hashSync(password, salt);
    return pwd;
  },
  jwtSigner(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  },
  removeNullValues(obj) {
    let cleanObj = {};
    Object.keys(obj).forEach((val) => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });
    return cleanObj;
  },
};

export default Utils;
