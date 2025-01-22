import { useState } from "react"

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = { display: detailsVisible ? '' : 'none' }

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
      {blog.likes}
      <button>like</button>
    </div>
  </div>
  )  
}

export default Blog