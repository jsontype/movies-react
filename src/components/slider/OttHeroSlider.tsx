import React, { useState, useEffect } from 'react'

// next link
import Link from 'next/link'

// next image
import Image from 'next/image'

// components
import CustomButton from '../CustomButton'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Thumbs } from 'swiper'

SwiperCore.use([Navigation, Thumbs])

// Redux Selector / Action
import { useSelector } from 'react-redux'
import { theme_scheme_direction } from '../../store/setting/selectors'

interface MoviesType {
  moviesSortByYear: [
    {
      id: number
      title: string
      rating: number
      genres: string[]
      summary: string
      duration: string
      large_cover_image: string
      runtime: number
    },
  ]
}

export const convertRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}hr ${remainingMinutes} minutes`
}

const OttHeroSlider = ({ moviesSortByYear }: MoviesType) => {
  const themeSchemeDirection = useSelector(theme_scheme_direction)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)
  const [_render, setRender] = useState(true)

  useEffect(() => {
    setRender(false)
    setTimeout(() => {
      setRender(true)
    }, 100)
    return () => {}
  }, [])

  // thumbsSwiper 설정 후 첫 슬라이드를 왼쪽으로 이동
  useEffect(() => {
    if (moviesSortByYear.length > 0 && thumbsSwiper) {
      for (let i = 0; i < 18; i++) {
        thumbsSwiper.slideTo(moviesSortByYear.length - 1)
      }
    }
  }, [thumbsSwiper, moviesSortByYear])

  console.log('movies: ', moviesSortByYear)

  const renderMiniSlide = moviesSortByYear.map((item, index) => {
    return (
      <SwiperSlide className="swiper-bg" key={index}>
        <div className="block-images position-relative">
          <div className="img-box">
            <Image
              src={item.large_cover_image}
              className="img-fluid"
              alt=""
              loading="lazy"
              width={0}
              height={0}
              sizes="100vw"
            />
            <div className="block-description ps-3">
              <h6 className="iq-title fw-500 mb-0">{item.title}</h6>
              <span className="fs-12">
                {item.runtime ? convertRuntime(item.runtime) : 'No Data For Runtime'}
              </span>
            </div>
          </div>
        </div>
      </SwiperSlide>
    )
  })

  const renderHeroSlide = moviesSortByYear.map((item, index) => {
    return (
      <SwiperSlide className="p-0" key={index}>
        <div className="slider--image block-images">
          <Image
            src={item.large_cover_image !== '' ? item.large_cover_image : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg' }
            loading="lazy"
            alt="banner"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
        <div className="description">
          <div className="row align-items-center h-100">
            <div className="col-lg-6 col-md-12">
              <div className="slider-content">
                <div className="d-flex align-items-center RightAnimate mb-3">
                  <span className="badge rounded-0 text-dark text-uppercase px-3 py-2 me-3 bg-white mr-3">
                    {item.rating}
                  </span>
                  <ul className="p-0 mb-0 list-inline d-flex flex-wrap align-items-center movie-tag">
                    {item.genres.map((genre, index) => (
                      <li
                        key={index}
                        className="position-relative text-capitalize font-size-14 letter-spacing-1"
                      >
                        <Link href="/view-all" className="text-decoration-none">
                          {genre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <h1 className="texture-text big-font letter-spacing-1 line-count-1 text-capitalize RightAnimate-two">
                  {item.title}
                </h1>
                <p className="line-count-3 RightAnimate-two">{item.summary}</p>
                <div className="d-flex flex-wrap align-items-center gap-3 RightAnimate-three">
                  <div className="slider-ratting d-flex align-items-center">
                    <ul className="ratting-start p-0 m-0 list-inline text-warning d-flex align-items-center justify-content-left">
                      <li>
                        <i className="fa fa-star" aria-hidden="true"></i>
                      </li>
                    </ul>
                    <span className="text-white ms-2 font-size-14 fw-500">{item.rating}/10</span>
                  </div>
                  <div className="text-primary font-size-14 fw-500 text-capitalize">
                    genres:{' '}
                    <Link href="/view-all" className="text-decoration-none ms-1">
                      {item.genres.join(', ')}
                    </Link>
                  </div>
                  <div className="text-primary font-size-14 fw-500 text-capitalize">
                    Runtime:{' '}
                    <Link href="/cast/detail" className="text-decoration-none ms-1">
                      {item.runtime ? convertRuntime(item.runtime) : 'No Data For Runtime'}
                    </Link>
                  </div>
                </div>
              </div>
              <CustomButton buttonTitle="Show Detail" link={`/blogs/detail/${item.id}`} linkButton="true" />
            </div>
          </div>
        </div>
      </SwiperSlide>
    )
  })

  return (
    <>
      <div className="iq-banner-thumb-slider">
        <div className="slider">
          <div className="position-relative slider-bg d-flex justify-content-end">
            {/* Mini Slide On Right Side - Start */}
            <div className="position-relative my-auto">
              <div className="horizontal_thumb_slider" data-swiper="slider-thumbs-ott">
                <div className="banner-thumb-slider-nav">
                  <Swiper
                    key={String(themeSchemeDirection)}
                    dir={String(themeSchemeDirection)}
                    tag="ul"
                    thumbs={{
                      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    direction="horizontal"
                    navigation={{
                      prevEl: '.slider-prev',
                      nextEl: '.slider-next',
                    }}
                    spaceBetween={24}
                    loop={true}
                    slidesPerView={2}
                    breakpoints={{
                      0: {
                        direction: 'horizontal',
                        slidesPerView: 1,
                      },
                      768: {
                        direction: 'horizontal',
                        slidesPerView: 2,
                      },
                    }}
                    watchSlidesProgress={true}
                    className="swiper-horizontal swiper-container mb-0"
                  >
                    {renderMiniSlide}
                  </Swiper>
                  <div className="slider-prev swiper-button">
                    <i className="iconly-Arrow-Left-2 icli"></i>
                  </div>
                  <div className="slider-next swiper-button">
                    <i className="iconly-Arrow-Right-2 icli"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* Mini Slide On Right Side - End */}

            {/* Hero Slide - Start */}
            <div className="slider-images" data-swiper="slider-images-ott">
              <Swiper
                key={String(themeSchemeDirection)}
                dir={String(themeSchemeDirection)}
                tag="ul"
                onSwiper={setThumbsSwiper}
                slidesPerView={1}
                watchSlidesProgress={true}
                allowTouchMove={false}
                loop={true}
                className="swiper-container"
              >
                {renderHeroSlide}
              </Swiper>
            </div>
            {/* Hero Slide - End */}
          </div>
        </div>
      </div>
    </>
  )
}

export default OttHeroSlider
