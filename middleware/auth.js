// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// export const authenticateToken = async (req, res, next) => {
//   try {
//     console.log("Auth middleware called");
//     const authHeader = req.headers["authorization"];
//     console.log("Auth header:", authHeader);

//     const token = authHeader && authHeader.split(" ")[1];
//     console.log("Token:", token ? "Present" : "Missing");

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication token required",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded);

//     const user = await User.findById(decoded.userId).select("-Password");
//     console.log("Found user:", user ? "Yes" : "No");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };


// middleware/auth.js
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    req.userId = decoded.userId; // THIS IS IMPORTANT
    next();
  });
};

export default authenticateToken;
