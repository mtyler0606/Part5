import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBlogAppUser')
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password   
      })
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`log in as ${user.username}`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000);
    }
    catch(exception){
      console.log(exception.message)
      setErrorMessage('Unable to log in')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

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
      }, 5000);
    }
    catch(exception){
      setErrorMessage('Unable to submit blog', exception.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    }
    //POST
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      <input
      type="text"
      value={username}
      name='Username'
      onChange={(event) => {setUsername(event.target.value)}} />
      <input
      type="text"
      name="Password"
      value={password}
      onChange={(event) => {setPassword(event.target.value)}} />
      <button type='submit'>Login</button>
    </div>
  </form>
  )

  const logOutButton = () => (
    <form onSubmit={handleLogout}>
      <button type='submit'>Logout</button>
    </form>
  )

  const addBlogForm = () => (
    <form onSubmit={submitBlog}>
      <h2>Create New Blog</h2>
      Title
      <input 
        type="text"
        value={title}
        name='Title'
        onChange={(event) => {setTitle(event.target.value)}}
      />
      <br />
      Author
      <input 
        type="text"
        value={author}
        name='Author'
        onChange={(event) => {setAuthor(event.target.value)}}
      />
      <br />
      URL
      <input 
        type="text"
        value={url}
        name='Url'
        onChange={(event) => {setUrl(event.target.value)}}
      />
      <br />
      <button type="submit">create</button>
    </form>
  )

  
  return (
    <div>
      { user === null?
        loginForm()
        : logOutButton()
      }
      { successMessage && <p>{successMessage}</p>}
      { errorMessage && <p>{errorMessage}</p>}
      { user &&
      <div>
      <h2>blogs</h2>
      <p>{user.username}</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }
    { user && addBlogForm()}
    </div>
  )
}

export default App