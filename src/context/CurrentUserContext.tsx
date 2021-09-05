import { 
  createContext,
  createEffect,
  createSignal,
  useContext,
  Component,
} from 'solid-js'
import api from '@lib/api'
import { status } from '@lib/http-status'

interface CurrentUser {
  jwt?: string
  name?: string
}

interface AuthHeader {
  Authorization: string
}

interface DefaultValue {
  currentUser: () => CurrentUser
  setCurrentUser: (u: CurrentUser) => CurrentUser
  authHeaders: () => AuthHeader
  sessionStarted: () => boolean
}

const defaultValue: DefaultValue = {
  currentUser: () => ({ jwt: '', name: '' }),
  setCurrentUser: (u: CurrentUser) => ({ jwt: '', name: '' }),
  authHeaders: () => ({ Authorization: '' }),
  sessionStarted: () => false
}

const CurrentUserContext = createContext(defaultValue)

export const useCurrentUser = () => useContext(CurrentUserContext)

export const CurrentUserProvider: Component = (props) => {
  const [sessionStarted, setSessionStarted] = createSignal<boolean>(false)
  const [currentUser, setCurrentUser] = createSignal<CurrentUser | null>(null)
  const authHeaders = () => ({ Authorization: `Bearer ${currentUser()?.jwt}`})

  createEffect(() => {
    api.post('/refresh-token')
      .then((response) => {
        if (response.status === status.OK) {
          setCurrentUser({
            jwt: response.data.jwt,
            name: response.data.name,
          })
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setSessionStarted(true))
  })

  return (
    <CurrentUserContext.Provider
      value={{ 
        currentUser, 
        setCurrentUser,
        authHeaders,
        sessionStarted,
      }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  )
}