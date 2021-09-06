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

type Timeout = ReturnType<typeof setTimeout>

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
  const [refreshTimeout, setRefreshTimeout] = createSignal<Timeout | null>(null)

  const authHeaders = () => ({ Authorization: `Bearer ${currentUser()?.jwt}`})

  const requestNewJWT = () => {
    api.post('/refresh-token')
      .then((response) => {
        if (response.status === status.OK) {
          setCurrentUser({
            jwt: response.data.jwt,
            name: response.data.name,
          })
          if (refreshTimeout()) clearTimeout(refreshTimeout())
          setRefreshTimeout(() => {
            return setTimeout(requestNewJWT, response.data.expiry - 2000)
          })
        }
      })
      .catch((error) => console.error(error))
      .finally(() => { 
        if(!sessionStarted()) setSessionStarted(true)
      })
  }

  createEffect(() => {
    if (sessionStarted()) return
    requestNewJWT()
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