import { useState, Fragment, memo } from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../cards/CardStyle";

const VideosRecommendedForYou = memo(() => {
  const [title] = useState("Videos Recommended For You");

  return (
    <>
      <SectionSlider
        title={title}
        className="recommended-block streamit-block"
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

VideosRecommendedForYou.displayName = 'VideosRecommendedForYou';
export default VideosRecommendedForYou;
