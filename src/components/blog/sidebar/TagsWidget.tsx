import React, { Fragment, memo } from 'react'

//react-router-dom
import Link from 'next/link'

//static data
import { blogTags } from '../../../StaticData/blogs'

const TagsWidget = memo(({ movieData }) => {
  const genres = movieData.genres

  return (
    <>
      <div id="tag_cloud-2" className="widget">
        <h5 className="widget-title position-relative">Genres</h5>
        <div className="tagcloud">
          <ul className="p-0 m-0 list-unstyled gap-2 widget_tags">
            {genres && genres.map((item, index) => {
              return (
                <li key={index}>
                  {/* ***! 6. Genreごとのページと連携 */}
                  <Link href="/blogs/filter/tags" className="position-relative">
                    {item}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}) as any

TagsWidget.displayName = 'TagsWidget'
export default TagsWidget
