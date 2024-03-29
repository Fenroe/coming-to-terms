import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  HeaderAlt, Container, Row, Col, Nav, ProfilePosts,
  ProfileBio, ThreeDots, Dropdown, MainNav, HomeSpinner,
  UserNotFound
} from '../components'
import { getUser } from '../utils'
import { useAuth } from '../hooks'
import { useQuery } from 'react-query'

const Profile = () => {
  const { auth } = useAuth()

  const [showing, setShowing] = useState('bio')

  const setActive = (navItemName) => {
    if (navItemName === showing) {
      return 'active'
    }
  }

  const { id } = useParams()

  const getUserWithId = async () => {
    return await getUser(id)
  }

  const { data, status } = useQuery(
    `profile${id}`,
    getUserWithId,
    {
      retry: false
    }
  )

  const renderComponent = () => {
    if (showing === 'posts') {
      return <ProfilePosts
      profileId={data._id}
      username={data.username}
      />
    }
    if (showing === 'bio') {
      return <ProfileBio
      bio={data.bio}
      username={data.username}
      />
    }
  }

  return (
    <>
    <MainNav />
    <HeaderAlt />
      <Container className="px-4 px-lg-5">
        {status === 'loading' && <HomeSpinner />}
        {status === 'error' && <UserNotFound username={id} />}
        {status === 'success' &&
        <>
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10 justify-content-between" lg={8} xl={7}>
              <div className="profile-heading">
                <h1>{data.username}</h1>
                {data.username === auth.username &&
                  (
                  <Dropdown>
                    <Dropdown.Toggle className="profile-options-btn">
                      <ThreeDots />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as="div" >
                        <Link to="/editprofile">Profile settings</Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  )}
              </div>
            </Col>
          </Row>
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <Nav className="nav-tabs justify-content-center">
                <Nav.Link className={setActive('bio')} onClick={() => setShowing('bio')}>Bio</Nav.Link>
                <Nav.Link className={setActive('posts')} onClick={() => setShowing('posts')}>Posts</Nav.Link>
              </Nav>
            </Col>
          </Row>
          <Row className="gx-4 gx-lg-5 justify-content-center">
            {renderComponent()}
          </Row>
        </>
        }
      </Container>
    </>
  )
}

export default Profile
