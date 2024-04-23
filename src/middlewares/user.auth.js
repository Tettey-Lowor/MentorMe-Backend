import userModel from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const adminOnlyRouteMiddleware = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      const error = new Error("Authentication Required");
      error.statusCode = 401;
      return next(error);
    }

    const decodedUser = jwt.verify(token, "secret");

    const user = await userModel.findById(decodedUser.id);

    if (!user) {
      const error = new Error("Authentication Required");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};