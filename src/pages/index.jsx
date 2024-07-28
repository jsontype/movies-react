import { memo, useState, useEffect } from 'react'

// hero slider
import OttHeroSlider from '@/components/slider/OttHeroSlider'

// sections
import TopTenMoviesToWatch from '@/components/sections/TopTenMoviesToWatch'
// import VerticalSectionSlider from "@/components/slider/VerticalSectionSlider"
import GenreSlider from '@/components/sections/GenreSlider'

const OTT = memo(() => {
  const [moviesSortByYear, setMoviesSortByYear] = useState([])
  const [moviesSortByRating, setMoviesSortByRating] = useState([])

  // Sort By Year
  useEffect(() => {
    fetch('https://yts.mx/api/v2/list_movies.json?sort_by=year')
      .then(res => res.json())
      .then(json => {
        const movies = json.data.movies;
        
        // Check Every Image URL 
        const imagePromises = movies.map(movie => 
          fetch(movie.large_cover_image, { mode: 'no-cors' })
            .then(res => {
              if (res) {
                console.log('movie.large_cover_image: ', movie.large_cover_image)
                console.log('res: ', res)
                console.log('res.status: ', res.status)
                return movie;
              } else {
                // ***! TODO: 404 GET console.log上で404表示されるが、こちには行かない。こちに行ったら、終わりなのに。
                console.log('movie.large_cover_image 404: ', movie.large_cover_image)
                throw new Error('Image not found');
              }
            })
            .catch(() => ({...movie, large_cover_image: ''}))
        )

        // Upadte After All Promise
        Promise.all(imagePromises)
          .then(updatedMovies => {
            setMoviesSortByYear(updatedMovies);
          });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);  

  // Sort By Rating
  useEffect(() => {
    fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
      .then(res => res.json())
      .then(json => {
        const movies = json.data.movies;
  
        // Check Every Image URL
        const imagePromises = movies.map(movie =>
          fetch(movie.large_cover_image, { mode: 'no-cors' })
          .then(res => {
            if (res) {
              return movie;
            } else {
              // 404
              throw new Error('Image not found');
            }
          })
          .catch(() => ({...movie, large_cover_image: ''}))
        );
  
        // Update After All Promises
        Promise.all(imagePromises)
          .then(updatedMovies => {
            setMoviesSortByRating(updatedMovies);
          });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <>
      <OttHeroSlider moviesSortByYear={moviesSortByYear} />
      <TopTenMoviesToWatch moviesSortByRating={moviesSortByRating} />
      {/* <VerticalSectionSlider sliderData={ottVerticleLatestMovies} /> */}
      <GenreSlider />
    </>
  )
})

OTT.displayName = 'OTT'
export default OTT
