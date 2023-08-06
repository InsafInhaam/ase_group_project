import {
  validateToken,
  validateUserToken,
  validateAdminToken,
} from "../utils/PasswordUtils.js";

export const Authenticate = async (req, res, next) => {
  const validate = await validateToken(req);
  if (validate) {
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export const UserAuthenticate = async (req, res, next) => {
  const validate = await validateUserToken(req);
  if (validate) {
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export const AdminAuthenticate = async (req, res, next) => {
  const validate = await validateAdminToken(req);
  if (validate) {
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};
