import { useState, memo } from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../cards/CardStyle";

const MoviesRecommendedForYou = memo(()=>  {
  const [title] = useState("Movies Recommended For You");

  return (
    <>
      <SectionSlider
        title={title}
        className="recommended-block"
        slidesPerView={6}
      >
        {(data) => (
          <CardStyle
            image={data.image}
            title={data.title}
            movieTime={data.movieTime}
            watchlistLink="/play-list"
            link="/movies/detail"
          />
        )}
      </SectionSlider>
    </>
  );
})

MoviesRecommendedForYou.displayName = 'MoviesRecommendedForYou';
export default MoviesRecommendedForYou;
