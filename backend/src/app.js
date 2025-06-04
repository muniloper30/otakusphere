import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import listsRoutes from "./routes/lists.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import animesRoutes from "./routes/animes.routes.js";

const app = express();

//  CORS CON CREDENCIALES
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

//  Rutas API primero
app.use('/usuarios', usersRoutes);
app.use("/listas", listsRoutes);
app.use("/favoritos", favoritesRoutes);
app.use("/reviews", reviewsRoutes);  // ✅ esta es la importante
app.use("/animes", animesRoutes);

//  Ruta de prueba en raíz
app.get('/', (req, res) => {
  res.send('Redirigete a http://localhost:5173 para ver la aplicación cliente');
});

//  Ruta de test a AniList 
app.get('/anime', async (req, res) => {
  const query = `
    query {
      Page(page: 1, perPage: 5) {
        media(type: ANIME) {
          id
          title { romaji english native }
          coverImage { large }
        }
      }
    }`;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from AniList" });
  }
});

export default app;
