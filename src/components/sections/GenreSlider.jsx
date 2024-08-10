import React, { useEffect, useState, memo } from 'react'

//components
import SectionSlider from '../slider/SectionSlider'
import GenersCard from '../cards/GanresCard'

//static data
import { geners as staticGeners, generateImgPath } from '../../StaticData/data'

const GenreSlider = memo(() => {
  const [geners, setGeners] = useState(staticGeners)

  useEffect(() => {
    fetch('https://yts.mx/api/v2/list_movies.json?sort_by=genre')
      .then(res => res.json())
      .then(json => {
        const fetchedGeners = json.data.movies.reduce((acc, movie) => {
          const genreSlug = movie.genres[0]?.toLowerCase()
          const existingGenre = acc.find(genre => genre.slug === genreSlug)

          if (!existingGenre && genreSlug) {
            acc.push({
              id: movie.id,
              slug: genreSlug,
              title: movie.genres[0],
              thumbnail: movie.large_cover_image || generateImgPath('/assets/images/no-image.webp'),
              type: 'movie',
            })
          }

          return acc
        }, [])

        const updatedGeners = staticGeners.map(staticGenre => {
          const apiGenre = fetchedGeners.find(apiGen => apiGen.slug === staticGenre.slug)
          return apiGenre ? { ...staticGenre, thumbnail: apiGenre.thumbnail } : staticGenre
        })

        setGeners(updatedGeners)
      })
  }, [])

  return (
    <>
      <SectionSlider
        className="movie-geners-block"
        title="Movie Geners"
        list={geners}
        slidesPerView={6}
        link="/genres/all-genre"
      >
        {data => (
          <GenersCard slug={data.slug} title={data.title} image={data.thumbnail} type={data.type} />
        )}
      </SectionSlider>
    </>
  )
})

GenreSlider.displayName = 'GenreSlider'
export default GenreSlider
