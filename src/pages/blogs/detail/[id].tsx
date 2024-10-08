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
import { getMoviesSortByRating, getMoviesSortByYear } from '@/store/media/actions'
import { AnyAction } from '@reduxjs/toolkit'
import type { MoviesType } from '@/types'

// convertRuntime import
import { convertRuntime } from '@/components/slider/OttHeroSlider'

const initMovieData = {
  background_image: "",
  background_image_original: "",
  description_full: "",
  genres: [],
  id: 0,
  imdb_code: "",
  language: "",
  large_cover_image: "",
  mpa_rating: "",
  rating: 0,
  runtime: 0,
  slug: "",
  small_cover_image: "",
  state: "",
  summary: "",
  synopsis: "",
  title: "",
  title_english: "",
  title_long: "",
  torrents: [],
  url: "",
  year: 0,
  yt_trailer_code: ""  
} as any

const BlogDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [movieData, setMovieData] = useState(initMovieData)
  const [movieDataPrev, setMovieDataPrev] = useState(initMovieData)
  const [movieDataNext, setMovieDataNext] = useState(initMovieData)
  const [torrentUrls, setTorrentUrls] = useState<string[]>([])

  const moviesSortByRating = useSelector(SettingSelector.moviesSortByRating)
  const moviesSortByYear = useSelector(SettingSelector.moviesSortByYear)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMoviesSortByRating() as unknown as AnyAction)
    dispatch(getMoviesSortByYear() as unknown as AnyAction)
  }, [])

  useEffect(() => {
    const moviesAll = moviesSortByRating.concat(moviesSortByYear)
    const moviesAllIndex = moviesAll.findIndex((item: MoviesType) => item.id === Number(id));
    // console.log(1111, moviesAllIndex)

    const result = moviesAll.find((item: MoviesType) => item.id === Number(id))
    const resultPrev = moviesAllIndex > 0 ? moviesAll[moviesAllIndex - 1] : moviesAll[moviesAll.length - 1];
    const resultNext = moviesAllIndex < moviesAll.length - 1 ? moviesAll[moviesAllIndex + 1] : moviesAll[0];
    setMovieData(result)
    setMovieDataPrev(resultPrev)
    setMovieDataNext(resultNext)
    console.log('movieData:' , movieData)
    // console.log('movieDataPrev:' , movieDataPrev)
    // console.log('movieDataNext:' , movieDataNext)
  }, [moviesSortByRating, moviesSortByYear])

  useEffect(() => {
    if (id) {
      fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.movie?.torrents && data.data.movie.torrents.length > 0) {
            // 全てのTorrent URLを取得
            const torrents = data.data.movie.torrents.map((torrent: any) => torrent.url)
            setTorrentUrls(torrents)
          }
        })
        .catch((error) => console.error('Error fetching torrent data:', error))
    }
  }, [id])

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
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      {/* Rating, Genres, Runtime */}
                      <div className="gap-3 RightAnimate-three">
                        <div>・ Rating: <span className={movieData.rating >= 9 ? 'text-info' : movieData.rating >= 7 ? 'text-warning' : 'text-primary'}>{movieData && movieData.rating}/10</span></div>
                        <div>・ Genres: {movieData.genres && movieData.genres.join(', ')}</div>
                        <div>・ Runtime: {movieData && movieData.runtime ? convertRuntime(movieData.runtime) : 'No Data'}</div>
                      </div>

                      {/* Synopsis */}
                      <div>
                        <div className="mt-4">・ Movie Synopsis</div>
                        <span className="mx-2" dangerouslySetInnerHTML={{ __html: movieData.synopsis }}></span>
                        <span>{movieData.synopsis === '' && 'No Data'}</span>
                      </div>
                      
                      {/* Download LinkをTorrentから＃hrefで表示 */}
                      {torrentUrls.length > 0 ? (
                        <div className="torrent-links mt-4">
                          <ul>
                            {torrentUrls.map((url, index) => (
                              <li key={index}>
                                <Link href={url} target="_blank" rel="noopener noreferrer">
                                  Download Link {index + 1}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p>Loading torrent links...</p>
                      )}
                    </div>
                    <div className="iq-blog-tag">
                      <FormWidget prevMovie={movieDataPrev} nextMovie={movieDataNext}></FormWidget>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="4" className="mt-5 mt-xl-0">
                <DetailMetaList movieData={movieData} />
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
