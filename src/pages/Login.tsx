import { createSignal } from 'solid-js'
import api from '../lib/api'
import type { Component } from "solid-js"

const Login: Component = () => {
  const [email, setEmail] = createSignal<string>('')
  const [password, setPassword] = createSignal<string>('')

  const handleLogin = (event: Event) => {
    event.preventDefault()
    api.post('/login', {
      email: email(),
      password: password(),
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.error(error))
  }

  return (
    <form autocomplete='current-password'>
      <input
        name='email'
        value={email()}
        oninput={(event: any) => setEmail(event.target.value) }
      />
      <input
        name='password'
        type='password'
        value={password()}
        oninput={(event: any) => setPassword(event.target.value) }
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  )
}

export default Login
