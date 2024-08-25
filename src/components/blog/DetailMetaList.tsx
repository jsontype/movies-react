import { memo } from 'react'
import Link from 'next/link'

//components
import TagsWidget from './sidebar/TagsWidget'
import FollowUs from './sidebar/FollowUs'

// ***! 8. あとで検索機能追加（できれば）
const DetailMetaList = memo(({ movieData }) => {
  const handleSearchClick = () => {
    console.log('clicked')
  }

  return (
    <>
      <div className="widget-area">
        <div id="search-2" className="widget widget_search">
          <form method="get" className="search-form" action="#" autoComplete="off">
            <div className="block-search_inside-wrapper position-relative d-flex">
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                name="s"
                defaultValue=""
              />
              <button 
                type="submit"
                className="block-search_button"
                onClick={handleSearchClick}
              >
                <i aria-hidden="true" className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <TagsWidget movieData={movieData} />
        <FollowUs />
        {/* <div className="widget text-center">
          <Link href="#">
            <img src={movieData.background_image_original} />
          </Link>
        </div> */}
      </div>
    </>
  )
})

DetailMetaList.displayName = 'DetailMetaList'
export default DetailMetaList
