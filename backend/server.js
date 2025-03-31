import express from 'express';
import cors from 'cors';
const app = express();


const corsOptions = {
    origin : ["http://localhost:5173"]
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send('Hello World!');
})

app.get("/anime", async (req, res) => {
    const query = `
    query {
        Page(page: 1, perPage: 5) {
            media(type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
                coverImage {
                    large
                }
            }
        }
    }`;

    try {
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from AniList" });
    }
});



app.listen(8080, () => {
    console.log('Server is running on port 8080');
    });