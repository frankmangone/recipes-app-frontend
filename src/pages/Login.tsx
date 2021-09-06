import { styled } from 'solid-styled-components'
import { createEffect, createSignal, Show } from 'solid-js'
import { useNavigate } from 'solid-app-router'
import api from '@lib/api'
import { colors } from '@lib/colors'
import { status } from '@lib/http-status'
import LoadingSpinner from '@components/LoadingSpinner'
import { useCurrentUser } from '@context/CurrentUserContext'
import type { Component } from "solid-js"

interface LoginResponse {
  jwt: string
  name: string
}

const Login: Component = () => {
  const { currentUser, setCurrentUser, sessionStarted } = useCurrentUser()
  const navigate = useNavigate()

  // For initial token check on page load for auto-redirection
  // const [verifyingToken, setVerifyingToken] = createSignal<boolean>(true)
  // To disable log in button while the request is being made
  const [logging, setLogging] = createSignal<boolean>(false)
  // Log in errors returned by the server
  const [error, setError] = createSignal<string | null>(null)

  // Signals for form fields
  const [email, setEmail] = createSignal<string>('')
  const [password, setPassword] = createSignal<string>('')


  createEffect(() => {
    /**
     * If there is a current user in store (with jwt),
     * redirect to /recipes
     */
    if (!sessionStarted()) return
    if (currentUser().jwt) {
      navigate('/recipes', { replace: true })
    }
  })

  const handleSuccessfulLogin = (data: LoginResponse) => {
    setCurrentUser(data)
    navigate('/recipes', { replace: true })
  }

  const handleLogin = (event: Event) => {
    event.preventDefault()
    setLogging(true)

    api.post('/login', {
      email: email(),
      password: password(),
    })
      .then((response) => {
        if (response.status === status.OK) handleSuccessfulLogin(response.data)
      })
      .catch((error) => {
        setLogging(false)
      })
  }

  return (
    <SideForm autocomplete='current-password'>
      {/* <Show when={!verifyingToken()} fallback={<p>Loading...</p>}> */}
        <p>Login</p>
        <Input
          name='email'
          value={email()}
          oninput={(event: any) => setEmail(event.target.value) }
        />
        <Input
          name='password'
          type='password'
          value={password()}
          oninput={(event: any) => setPassword(event.target.value) }
        />
        <Button
          onClick={handleLogin}
          disabled={logging()}
        >
          <Show when={!logging()} fallback={<LoadingSpinner />}>
            <p>Login</p>
          </Show>
        </Button>
      {/* </Show> */}
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

  width: 25rem;
  max-width: calc(100vw - 2rem);
  padding: 1rem;
`

const Input = styled('input')`
  background-color: ${colors.white};
  border: none;
  border-radius: 0.2rem;
  box-shadow: 0px 4px 12px -6px ${colors.primary[30]};
  padding: 0.6rem;
  margin: 0.4rem 0;
  line-height: 22px;
  outline: none;
`

const Button = styled('button')`
  background-color: ${colors.primary[60]};
  border: 1px solid ${colors.primary[50]};
  border-radius: 0.2rem;
  box-shadow: 0px 4px 12px -6px ${colors.primary[30]};
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.6rem;
  margin: 0.3rem 0;

  &:hover {
    background-color: ${colors.primary[50]};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.primaryUnsaturated[40]};
    border-color: ${colors.primaryUnsaturated[40]};
  }

  p {
    line-height: 22px;
    margin: 0;
  }
`

