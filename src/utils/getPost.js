import { axios } from './index'

const getPost = async (postId) => {
  const getPostUrl = `${process.env.REACT_APP_API_URL}/articles/info/${postId}`
  const response = await axios.get(getPostUrl)
  return response.data.article
}

export default getPost
