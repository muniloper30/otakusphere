import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import listsRoutes from "./routes/lists.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";

const app = express();

// 🔧 CORS CON CREDENCIALES
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Ruta AniList demo
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

app.use('/usuarios', usersRoutes);
app.use("/listas", listsRoutes);
app.use("/favoritos", favoritesRoutes);

export default app;
