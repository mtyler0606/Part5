import { useState } from "react"

const Blog = ({ blog, blogService }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = { display: detailsVisible ? '' : 'none' }

  const addLike = async (event) => {
    event.preventDefault()

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    const response = await blogService.updateBlog(blog._id.toString(), updatedBlog)
    setLikes(likes + 1)

  }

  return(
  <div style={blogStyle}>
    <div>
      {blog.title}
      <button onClick={()=>{setDetailsVisible(!detailsVisible)}}>
        {detailsVisible ? 'hide': 'view'}
      </button>
    </div>
    <div style={showDetails}>
      {blog.url}
      <br />
      likes {likes}
      <button onClick={addLike}>like</button>
      <br />
      {blog.user.name}
    </div>
  </div>
  )  
}

export default Blog