import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const blogFormRef = useRef()

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

 
  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }


  

  const logOutButton = () => (
    <form onSubmit={handleLogout}>
      <button type='submit'>Logout</button>
    </form>
  )

  

  
  return (
    <div>
      { user === null?
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} loginService={loginService} blogService={blogService} />
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
    { user && 
    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
      <AddBlogForm
        blogs={blogs}
        setBlogs={setBlogs} 
        blogService={blogService}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage} />
    </Toggleable>
}
    </div>
  )
}

export default App