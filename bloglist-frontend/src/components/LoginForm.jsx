import { useState } from "react"

const LoginForm = ({
  setUser,
  setErrorMessage,
  setSuccessMessage,
  loginService,
  blogService
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  return (
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
}

export default LoginForm