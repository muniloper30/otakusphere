import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // Si no hay token, se devuelve un error 401 (no autorizado)
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }
 // Verifica el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') { // Si el token ha expirado, se avisa al usuario de sesion expirada
        return res.status(401).json({ error: 'Sesión expirada. Por favor, inicie sesión nuevamente.' });
      }
      return res.status(403).json({ error: 'Token inválido. Usuario no registrado' });
    }

    req.usuario = decoded;
    next();
  });
};
