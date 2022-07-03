import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { HeaderAlt, Container, Row, Col, Button, MainNav } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, publishPost } from '../utils'
import { useAuth } from '../hooks'

const Preview = () => {
  const [postData, setPostData] = useState({})

  const { id } = useParams()

  const navigate = useNavigate()

  const { auth } = useAuth()

  const handlePublish = async () => {
    await publishPost(id, auth.username, auth.token)
    navigate(`/posts/${id}`)
  }

  useEffect(() => {
    if (!id) {
      navigate('/')
    } else {
      getPost(id)
        .then((result) => setPostData(result))
    }
  }, [])
  return (
    <>
      <MainNav />
      <HeaderAlt />
      <main>
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h1>{postData.title}</h1>
              <h2>{postData.previewText}</h2>
              <div dangerouslySetInnerHTML={{ __html: postData.content }} />
              <br />
              <div className="mb-3">
                <Button className="btn btn-danger text-uppercase" type="button" onClick={handlePublish}>Publish</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

Preview.propTypes = {
  previewData: PropTypes.object,
  setPreviewData: PropTypes.func
}

export default Preview