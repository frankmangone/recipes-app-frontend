import { createSignal } from 'solid-js'
import type { Component } from "solid-js"

const Login: Component = () => {
  const [email, setEmail] = createSignal<string>('')
  const [password, setPassword] = createSignal<string>('')

  return (
    <form autocomplete='off'>
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
      <button>Login</button>
    </form>
  )
}

export default Login
