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
  // const [movies, setMovies] = useState([])

  // ***! 
  useEffect(() => {
    fetch('https://yts.mx/api/v2/list_movies.json?sort_by=year')
      .then(res => {
        return res.json()
      })
      .then(json => {
        setMoviesSortByYear(json.data.movies)
      })
  }, [])
  // useEffect(() => {
  //   fetch('https://yts.mx/api/v2/list_movies.json?sort_by=year')
  //     .then(res => res.json())
  //     .then(json => {
  //       const movies = json.data.movies;
        
  //       // Check Every Image URL 
  //       const imagePromises = movies.map(movie => 
  //         fetch(movie.large_cover_image)
  //           .then(res => {
  //             if (!res.ok) {
  //               throw new Error('Image not found');
  //             }
  //             return movie;
  //           })
  //           .catch(() => ({...movie, large_cover_image: ''}))
  //       );
  
  //       // Upadte After All Promise
  //       Promise.all(imagePromises)
  //         .then(updatedMovies => {
  //           setMoviesSortByYear(updatedMovies);
  //         });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching movies:', error);
  //     });
  // }, []);  

  // useEffect(() => {
  //   fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(json => {
  //       setMoviesSortByRating(json.data.movies)
  //     })
  // }, [])
  useEffect(() => {
    fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating', { mode: 'no-cors' })
      .then(res => res.json())
      .then(json => {
        const movies = json.data.movies;
  
        // Check Every Image URL
        const imagePromises = movies.map(movie =>
          fetch(movie.large_cover_image, { mode: 'no-cors' })
            .then(res => {
              console.log('res: ', res)
              console.log('res.status: ', res.status)
              if (!res.ok) {
                throw new Error(`Image not found, status code: ${res.status}`);
              }
              return movie;
            })
            .catch(error => {
              console.error('Fetch error:', error);
              return { ...movie, large_cover_image: '' };
            })
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
