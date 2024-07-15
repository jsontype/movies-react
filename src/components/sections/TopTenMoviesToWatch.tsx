import React, { memo, useState } from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import TopTenCard from "../cards/TopTenCard";

interface MoviesType {
  moviesSortByRating: [{
    id: number;
    title: string;
    rating: number;
    genres: string[];
    summary: string;
    duration: string;
    large_cover_image: string;
    runtime: number;
  }]
}

const TopTenMoviesToWatch = memo(({ moviesSortByRating }: MoviesType) => {
  const [title] = useState("top ten movies to watch");
  const topTen = moviesSortByRating.slice(0, 10).map((movie, index) => ({
    image: movie.large_cover_image,
    count: index + 1,
  }));

  return (
    <>
      <SectionSlider title={title} list={topTen} className="top-ten-block">
        {(data) => (
          <TopTenCard
            imagePath={data.image}
            countValue={data.count}
            link="/movies/detail"
          />
        )}
      </SectionSlider>
    </>
  );
});

TopTenMoviesToWatch.displayName = "TopTenMoviesToWatch";
export default TopTenMoviesToWatch;
