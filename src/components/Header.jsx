import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Container, Row, Col } from './index'

const Header = ({ backgroundImage, heading, subheading, metaAuthor, metaDate }) => {
  return (
    <header className="masthead" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <Container className="position-relative px-4 px-lg-5">
      <Row className="gx-4 gx-lg-5 justify-content-center">
        <Col lg={8} xl={7} className="md-10">
          <div className="site-heading">
            <h1>{heading}</h1>
            {subheading && <span className="subheading">{subheading}</span>}
            {metaAuthor && metaDate && <span className="meta">Posted by <Link to={`/profile/${metaAuthor}`}>{metaAuthor}</Link> on {metaDate}</span>}
          </div>
        </Col>
      </Row>
    </Container>
  </header>
  )
}

Header.propTypes = {
  backgroundImage: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  metaAuthor: PropTypes.string,
  metaDate: PropTypes.string
}

export default Header
