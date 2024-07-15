import { memo } from "react";

// hero slider
import MovieHeroSlider from "@/components/slider/MovieHeroSlider";

// section
import SpecialsLatestMovies from "@/components/sections/Specials&LatestMovies";
import MoviesRecommendedForYou from "@/components/sections/MoviesRecommendedForYou";

import { useEnterExit } from "@/utilities/usePage";

const Movies = memo(() => {
    useEnterExit()
    return (
        <>

            <MovieHeroSlider />
            <SpecialsLatestMovies />
            <MoviesRecommendedForYou />

        </>
    );
});

Movies.displayName = "Movies";
export default Movies;
