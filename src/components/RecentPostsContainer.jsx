import React from 'react'
import PropTypes from 'prop-types'
import { Col, PostCard } from './index'

const RecentPostsContainer = ({ recentPosts }) => {
  return (
    <Col className="md-10 col-lg-8 col-xl-7">
      {recentPosts.length === 0
        ? (
        <p>No posts to show.</p>
          )
        : null}
      {recentPosts.map((post) =>
      <PostCard
      key={post._id}
      id={post._id}
      title={post.title}
      subtitle={post.previewText}
      author={post.author.username}
      datePublished={post.datePublishedFormatted}
      />)}
    </Col>
  )
}

RecentPostsContainer.propTypes = {
  recentPosts: PropTypes.array
}

export default RecentPostsContainer