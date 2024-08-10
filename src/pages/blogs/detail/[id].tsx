import { useState, useEffect } from 'react'

// React-bootstrap
import { Row, Col, Container } from 'react-bootstrap'

// Router
import Link from 'next/link'

// Components
import DetailMetaList from '@/components/blog/DetailMetaList'
import FormWidget from '@/components/blog/FormWidget'

// Custom hook
import { useBreadcrumb } from '@/utilities/usePage'

// URLのQuery Stringを扱う
import { useRouter } from 'next/router'

import * as SettingSelector from '@/store/media/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { getMoviesSortByRating } from '@/store/media/actions'
import { AnyAction } from '@reduxjs/toolkit'
import type { MoviesType } from '@/types'

const BlogDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [movieData, setMovieData] = useState<any>({})

  const moviesSortByRating = useSelector(SettingSelector.moviesSortByRating)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMoviesSortByRating() as unknown as AnyAction)
  }, [])
  useEffect(() => {
    const result = moviesSortByRating.find((item: MoviesType) => item.id === Number(id))
    setMovieData(result)
    // ***! 1. これ見ながら完成させて
    console.log('movieData:' , movieData)
  }, [moviesSortByRating])

  useBreadcrumb('The Most Anticipated Movies')

  return (
    <>
      {movieData !== undefined && movieData !== null ? (
        <div className="section-padding">
          <Container>
            <Row>
              <Col xl="8">
                <div className="iq-blog blog-detail">
                  <Link href="" className="blog-image d-block overflow-hidden">
                    <img src={movieData.large_cover_image} loading="lazy" alt="" className="img-fluid w-100" />
                  </Link>
                  <div className="iq-blog-box pt-4">
                    <div className="iq-blog-meta d-flex mb-3">
                      <ul className="iq-blogtag list-inline">
                        <li className="border-gredient-left">
                          <Link href="/blogs/filter/author" className="iq-user">
                            <i className="fa fa-user-o me-1" aria-hidden="true"></i>
                            {movieData.title}
                          </Link>
                        </li>
                      </ul>
                      <ul className="list-inline mb-0 ms-2">
                        <li className="border-gredient-left">
                          <Link rel="bookmark" href="/blogs/filter/date">
                            <i className="far fa-calendar-alt me-1" aria-hidden="true"></i>
                            {movieData.date_uploaded}{' '}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div dangerouslySetInnerHTML={{ __html: movieData.synopsis }}></div>
                    {/* ***! 2. Download LinkをTorrentから＃hrefで表示  */}
                  </div>
                    <div className="iq-blog-tag">
                      <FormWidget></FormWidget>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="4" className="mt-5 mt-xl-0">
                <DetailMetaList />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default BlogDetail
