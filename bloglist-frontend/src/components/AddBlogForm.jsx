import { useState } from 'react'

const AddBlogForm = ({
  blogs,
  setBlogs,
  blogService,
  setErrorMessage,
  setSuccessMessage
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = async(event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try{
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`New Blog ${newBlog.title} Created`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    }
    catch(exception){
      setErrorMessage('Unable to submit blog', exception.message)
      console.log(exception.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
    //POST
  }
  return(
    <form onSubmit={submitBlog}>
      <h2>Create New Blog</h2>
      <input
        type="text"
        value={title}
        name='Title'
        placeholder='Title'
        onChange={(event) => {setTitle(event.target.value)}}
      />
      <br />
      <input
        type="text"
        value={author}
        name='Author'
        placeholder='Author'
        onChange={(event) => {setAuthor(event.target.value)}}
      />
      <br />
      <input
        type="text"
        value={url}
        name='Url'
        placeholder='URL'
        onChange={(event) => {setUrl(event.target.value)}}
      />
      <br />
      <button type="submit">create</button>
    </form>
  )
}

export default AddBlogForm