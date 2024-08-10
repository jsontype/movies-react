import React, { memo } from 'react'

//router
import Link from 'next/link'

//components
import RecentPost from './sidebar/RecentPost'
import CategoriesWidget from './sidebar/CategoriesWidget'
import TagsWidget from './sidebar/TagsWidget'
import FollowUs from './sidebar/FollowUs'

// ***! 111. Blog Standerd Sub
const DetailMetaList = memo(() => {
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
        <RecentPost />
        <CategoriesWidget />
        <TagsWidget />
        <FollowUs />
        <div className="widget text-center">
          <Link href="/merchandise/shop">
            <img src="/assets/images/blog/blog1.webp" />
          </Link>
        </div>
      </div>
    </>
  )
})

DetailMetaList.displayName = 'DetailMetaList'
export default DetailMetaList
