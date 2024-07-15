import { memo, useState, useEffect } from "react"

// hero slider
import OttHeroSlider from "@/components/slider/OttHeroSlider"

// sections
import TopTenMoviesToWatch from "@/components/sections/TopTenMoviesToWatch"
// import VerticalSectionSlider from "@/components/slider/VerticalSectionSlider"
import GenreSlider from "@/components/sections/GenreSlider"

const OTT = memo(() => {
  const [moviesSortByYear, setMoviesSortByYear] = useState([])
  const [moviesSortByRating, setMoviesSortByRating] = useState([])
  // const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("https://yts.mx/api/v2/list_movies.json?sort_by=year")
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setMoviesSortByYear(json.data.movies)
      })
  }, [])

  useEffect(() => {
    fetch("https://yts.mx/api/v2/list_movies.json?sort_by=rating")
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setMoviesSortByRating(json.data.movies)
      })
  }, [])  

  return (
    <>
      <OttHeroSlider moviesSortByYear={moviesSortByYear} />
      <TopTenMoviesToWatch moviesSortByRating={moviesSortByRating} />
      {/* <VerticalSectionSlider sliderData={ottVerticleLatestMovies} /> */}
      <GenreSlider />
    </>
  )
})

OTT.displayName = "OTT"
export default OTT
