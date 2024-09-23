import { useState } from 'react'

//components
import TagsWidget from './sidebar/TagsWidget'
import FollowUs from './sidebar/FollowUs'

// ***! TODO: movieData なんでエラー？
const DetailMetaList = ({ movieData }) => {
  const [searchText, setSearchText] = useState('')

  const handleSearchClick = () => {
    console.log('clicked')
  }

  // ***! TODO. 検索機能
  const onSubmit = (e) => {
    e.preventDefault()
    alert(`TODO: ${searchText}を生かして、検索機能を作成する`)
  }

  const onChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <>
      <div className="widget-area">
        <div id="search-2" className="widget widget_search">
          <form method="get" className="search-form" autoComplete="off" onSubmit={onSubmit}>
            <div className="block-search_inside-wrapper position-relative d-flex">
              <input
                type="search"        
                className="form-control"
                placeholder="Search"
                name="s"
                value={searchText}
                onChange={onChange}
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
}

DetailMetaList.displayName = 'DetailMetaList'
export default DetailMetaList
