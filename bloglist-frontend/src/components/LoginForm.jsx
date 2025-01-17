const LoginForm = ({}) => (<form onSubmit={handleLogin}>
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
</form>)