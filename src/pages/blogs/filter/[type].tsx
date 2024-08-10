import { Fragment, memo } from 'react'
//react bootstrap
import { Container, Row, Col } from 'react-bootstrap'

//components
import CardBlogList from '@/components/cards/CardBlogList'
import DetailMetaList from '@/components/blog/DetailMetaList'

//static data
import { blogs } from '@/StaticData/blogs'

import { useRouter } from 'next/router'
import FilterBlogBreadcrumb from '@/components/blog/FiterBlogBreadcrumb'

// ***! 5. pages/blogs/filter/tags -> tagsがmoviesAll...(limitを20 → 500にしてとるやつ)みたいなstoreを作成して、そこからgenresの中身が[action, comedy]みたいになっているはずだが、そのいずれかにあっただらここに入るように実装をすること
const Filter = memo(props => {
  const router = useRouter()

  return (
    <>
      <FilterBlogBreadcrumb type={router.query.type}></FilterBlogBreadcrumb>
      <div className="section-padding">
        <Container>
          <Row>
            <Col lg="8" sm="12">
              {blogs.slice(0, 7).map((item, index) => {
                return (
                  <CardBlogList
                    key={index}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    blogDate={item.blogDate}
                    username={item.username}
                    categories={item.categories}
                    tags={item.tags}
                    description={item.description}
                  />
                )
              })}
            </Col>
            <Col lg="4" sm="12">
              <DetailMetaList></DetailMetaList>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
})

Filter.displayName = 'Filter'
export default Filter
