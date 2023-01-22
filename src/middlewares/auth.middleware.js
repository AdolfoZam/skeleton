// const jwt = require('jsonwebtoken');

// const authMiddleware = ( req, res ) => {
//     let { authorization: token } = req.headers;//se cambia el nombre a una propiedad destructurada
//     token = token?.replace("Bearer ", "");
//     console.log(token);
//     jwt.verify(
//         token,
//         process.env.JWT_SECRET,
//         { algorithms: "HS512"},
//         (err, decoded) => {
//             if(err) {
//                 res.status(400).json({
//                     error: "invalid token",
//                     message: "El token no es valido o ya expiro, envia uno nuevo",
//                 });
//             } else {
//                 console.log(decoded);
//                 next();
//             }
//         }
//     );
// };

// module.exports = authMiddleware;