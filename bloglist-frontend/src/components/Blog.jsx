import { useState } from "react"

const Blog = ({ blog, blogService, blogs, setBlogs }) => {
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

  const deleteBlog = async (event) => {
    event.preventDefault()
    if(window.confirm("Delete Blog?")){
      try{
        const blogId = blog._id
        await blogService.deleteBlog(blog._id.toString())
        setBlogs(blogs.filter(Blog => Blog._id !== blogId))
      }
      catch(error){
        console.log(error.message)
      }
  }
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
      <br />
      <button onClick={deleteBlog}>delete</button>
    </div>
  </div>
  )  
}

export default Blog