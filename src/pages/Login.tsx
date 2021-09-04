import { styled } from 'solid-styled-components'
import { createSignal } from 'solid-js'
import api from '../lib/api'
import { colors } from '../lib/colors'
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
    <SideForm autocomplete='current-password'>
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
    </SideForm>
  )
}

export default Login

/**
 * Styles
 */

const SideForm = styled('form')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  background-color: ${colors.primary[70]};
`