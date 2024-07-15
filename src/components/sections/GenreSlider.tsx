import React, { Fragment, memo } from 'react'

//components
import SectionSlider from '../slider/SectionSlider'
import GenersCard from '../cards/GanresCard'

//static data
import { geners } from '../../StaticData/data'

const GenreSlider = memo(() => {
  return (
    <>
        <SectionSlider className="movie-geners-block" title='Movie Geners' list={geners} slidesPerView={6} link="/genres/all-genre">
        {(data) => (
          <GenersCard
          slug={data.slug}
          title={data.title}
          image={data.thumbnail}
          type={data.type}
        />
        )}
        </SectionSlider>
    </>
  )
})

GenreSlider.displayName = 'GenreSlider'
export default GenreSlider