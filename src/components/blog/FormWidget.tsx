import { memo, useState } from 'react'

// react-bootstrap
import { Button, Col, Form, Row } from 'react-bootstrap'

interface Props {
  prevMovie: any
  nextMovie: any
}

const FormWidget = memo(({ prevMovie, nextMovie }: Props) => {
  const [commentText, setCommentText] = useState<string>('')

  // ***! TODO. コメント機能
  const onClick = () => {
    alert(`TODO: ${commentText}を生かして、コメント機能を作成する`)
  }

  const onChange = (e) => {
    setCommentText(e.target.value)
  }

  return (
    <>
      <Row className="blog-nav">
        <Col lg="6" className="blog-prev-post mb-5 mb-lg-0 border-end">
          <a href={`/blogs/detail/${prevMovie.id}`}>
            <div className="blog-arrow font-size-14 fw-normal mb-3">
              <i className="fas fa-arrow-left"></i>
              <span className="previous fw-medium fst-italic"> Previous Post</span>
            </div>
            <span className="fw-semibold text-white">{ prevMovie.title }</span>
          </a>
        </Col>
        <Col lg="6" className="blog-next-post text-start text-lg-end">
          <a href={`/blogs/detail/${nextMovie.id}`}>
            <div className="blog-arrow font-size-14 fw-normal mb-3">
              <span className="next fw-medium fst-italic"> Next Post</span>
              <i className="fas fa-arrow-right"></i>
            </div>
            <span className="fw-semibold text-white">{ nextMovie.title }</span>
          </a>
        </Col>
      </Row>
      <Form>
        <h4 className="fw-500 mb-3">Leave a Reply</h4>
        <p className="mb-4">
          Logged in as Jenny. <span className="text-primary">Edit your profile. Log out?</span>
          Required fields are marked *
        </p>
        <Row>
          <Col md="12">
            <textarea
              className="form-control"
              name="comment"
              cols={5}
              rows={8}
              required
              placeholder="Comment"
              onChange={onChange}
            ></textarea>
          </Col>
          <Col md="12">
            <div className="form-submit mt-4">
              <div className="iq-button">
                <Button
                  name="submit"
                  type="button"
                  onClick={onClick}
                  id="submit"
                  className="btn text-uppercase position-relative"
                >
                  <span className="button-text">Post Comment</span>
                  <i className="fa-solid fa-play"></i>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  )
})

FormWidget.displayName = 'FormWidget'
export default FormWidget
