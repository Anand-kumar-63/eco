import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
const userAuthentciation = async (req, res, next) => {
  // if()
  let token;
  if (req.header.authorisation && req.headers.authorisation.startswith('Bearer')) {
    try {
      token = req.header.authorisation.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.id).select('-password');
      next();
    }
    catch (error) {
      return res.status(200).json({ message: "User not authorised , token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
}
export default userAuthentciation;