import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // El token debe venir como una Authorization: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Guardamos los datos del token en la request
    next(); // Continúa al siguiente handler
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

