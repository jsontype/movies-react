import { memo, useState, useEffect } from 'react'

// hero slider
import OttHeroSlider from '@/components/slider/OttHeroSlider'

// sections
import TopTenMoviesToWatch from '@/components/sections/TopTenMoviesToWatch'
import GenreSlider from '@/components/sections/GenreSlider'

const OTT = memo(() => {
  const NO_IMAGE_URL = '/assets/images/No_Image_Available.jpg';

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
                return movie;
              } else {
                throw new Error('Image not found');
              }
            })
            .catch(() => ({ ...movie, large_cover_image: NO_IMAGE_URL }))
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
              throw new Error('Image not found');
            }
          })
          .catch(() => ({ ...movie, large_cover_image: NO_IMAGE_URL }))
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
      <GenreSlider />
    </>
  )
})

OTT.displayName = 'OTT'
export default OTT
