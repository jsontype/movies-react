import { FC, Fragment, memo, useState } from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../cards/CardStyle";

const RecommendedTVShow = memo(() => {
  const [title] = useState("recommended TV Show");

  return (
    <>
      <SectionSlider
        title={title}
        className="recommended-block streamit-block"
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
});

RecommendedTVShow.displayName = "RecommendedTVShow";
export default RecommendedTVShow;
