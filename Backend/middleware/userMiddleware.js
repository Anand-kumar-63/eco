import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
const userAuthentciation = async (req, res, next) => {
  // if()
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded); 
      req.user = await userModel.findById(decoded.Id).select('-password');
      // console.log(req.user);
      console.log(req.user);
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