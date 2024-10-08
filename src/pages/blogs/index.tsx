import { memo } from 'react'

// react bootstrap
import { Container, Row, Col } from 'react-bootstrap'

// components
import CardBlogList from '../../components/cards/CardBlogList'

// static data
import { blogs } from '../../StaticData/blogs'

// custom hook
import { useBreadcrumb } from '@/utilities/usePage'

const BLogs = memo(() => {
  useBreadcrumb('Blog List')
  return (
    <>
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
          </Row>
        </Container>
      </div>
    </>
  )
})

BLogs.displayName = 'BLogs'
export default BLogs
