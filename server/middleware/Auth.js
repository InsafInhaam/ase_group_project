import { validateToken } from "../utils/PasswordUtils.js";

export const Authenticate = async (req, res, next) => {
  const validate = await validateToken(req);
  if (validate) {
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};
