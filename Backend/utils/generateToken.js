import jwt from "jsonwebtoken";
async function generateToken(Id){
       const token = await jwt.sign({Id},process.env.JWT_SECRET,{expiresIn:'30d'});
       return token;
}
export default generateToken;