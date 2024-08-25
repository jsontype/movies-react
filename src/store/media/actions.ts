import { SettingMedia } from './reducers'
import { movieTags, tvShowsTags, videoTags, cast } from '../../StaticData/data'

export const {
  movies_sort_by_rating,
  movies_sort_by_year,
  media_movies,
  upcommming_movies,
  latest_movies,
  suggested_for_you,
  big_slider,
  movie_slider,
  movie_of_the_year,
  recommended_movies,
  related_movies,
  upcomming_movie,
  pagination_movies,
  load_more_up,
  load_more_down,
  // videos
  popular_videos,
  specials_latest_videos,
  videos_recommended_for_you,
  video_slider,
  upcoming_video,
  // show
  tV_popular_shows,
  best_of_international_shows,
  suggested_tv_shows,
  shows_we_recommend,
  tv_show_slider,
  trending_slider,
  // tags
  media_moviesTags,
  media_tvShowsTags,
  media_videoTags,
  // cast
  movie_cast,
} = SettingMedia.actions

const sleepTime = 500
export const getMoviesSortByRating =
  () => (dispatch: (arg0: { payload: any; type: 'media/movies_sort_by_rating' }) => void) => {
    fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
      .then(res => res.json())
      .then(json => json.data.movies)
      .then(result => {
        dispatch(movies_sort_by_rating(result))
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
export const getMoviesSortByYear =
() => (dispatch: (arg0: { payload: any; type: 'media/movies_sort_by_year' }) => void) => {
  fetch('https://yts.mx/api/v2/list_movies.json?sort_by=year')
    .then(res => res.json())
    .then(json => json.data.movies)
    .then(result => {
      dispatch(movies_sort_by_year(result))
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
}  
export const getMoviesTagsAsync =
  () => (dispatch: (arg0: { payload: any; type: 'media/media_moviesTags' }) => void) => {
    // You can call api here
    setTimeout(() => {
      dispatch(media_moviesTags(movieTags))
    }, sleepTime)
  }
export const getTvShowTagsAsync =
  () => (dispatch: (arg0: { payload: any; type: 'media/media_tvShowsTags' }) => void) => {
    // You can call api here
    setTimeout(() => {
      dispatch(media_tvShowsTags(tvShowsTags))
    }, sleepTime)
  }
export const getVideoTagsAsync =
  () => (dispatch: (arg0: { payload: any; type: 'media/media_videoTags' }) => void) => {
    // You can call api here
    setTimeout(() => {
      dispatch(media_videoTags(videoTags))
    }, sleepTime)
  }

export const getLatestMoviesAsync =
  () => (dispatch: (arg0: { payload: any; type: 'media/latest_movies' }) => void) => {
    setTimeout(() => {
      dispatch(latest_movies(latest_movies))
    }, sleepTime)
  }

export const getTrendingSliderAsync =
  () => (dispatch: (arg0: { payload: any; type: 'media/trending_slider' }) => void) => {
    setTimeout(() => {
      dispatch(trending_slider(trending_slider))
    }, sleepTime)
  }
// cast
export const getMovieCastAsync =
  () => (dispatch: (arg0: { payload: any; type: 'media/movie_cast' }) => void) => {
    setTimeout(() => {
      dispatch(movie_cast(cast))
    }, sleepTime)
  }
export default SettingMedia.actions
