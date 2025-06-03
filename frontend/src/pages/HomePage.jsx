import { useEffect, useState, useRef } from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import AnimeLoopBanner from "../components/AnimeLoopBanner";
import RankingTable from "../components/RankingTable";

const HomePage = () => {
  const [animes, setAnimes] = useState([]);
  const rankingRef = useRef(null);
  const heroSectionRef = useRef(null)

  useEffect(() => {
    const fetchTopAnimes = async () => {
      const query = `
        query {
          Page(perPage: 50) {
            media(sort: SCORE_DESC, type: ANIME) {
              id
              title {
                romaji
              }
              coverImage {
                large
              }
              genres
              averageScore
              popularity
              format
              season
              seasonYear
              status
            }
          }
        }
      `;

      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        const json = await response.json();

        const formatted = json.data.Page.media.map((anime) => ({
          id: anime.id,
          title: anime.title.romaji,
          coverImage: anime.coverImage.large,
          genres: anime.genres,
          score: anime.averageScore,
          userCount: anime.popularity,
          type: anime.format === "TV" ? "TV Show" : anime.format,
          season: anime.season,
          year: anime.seasonYear,
          status: anime.status,
        }));

        setAnimes(formatted);
      } catch (error) {
        console.error("Error al cargar el top de animes:", error);
      }
    };

    fetchTopAnimes();
  }, []);

 return (
    <div className="min-h-screen  text-white">
      <AnimeLoopBanner scrollToHero={() => heroSectionRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <div ref={heroSectionRef}>
        <HeroSection scrollToRanking={() => rankingRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      </div>
      <FeatureSection />
      <div ref={rankingRef}>
        <RankingTable animes={animes} />
      </div>
    </div>
  );
};

export default HomePage;