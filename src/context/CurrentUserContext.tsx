import { 
  createContext,
  createSignal,
  useContext,
  Component,
} from 'solid-js'

interface CurrentUser {
  jwt?: string
  name?: string
}

interface AuthHeader {
  Authorization: string
}

interface DefaultValue {
  currentUser?: () => CurrentUser
  setCurrentUser?: (u: CurrentUser) => CurrentUser
  authHeaders?: () => AuthHeader
}

const defaultValue: DefaultValue = {
  currentUser: () => ({ jwt: '', name: '' }),
  setCurrentUser: (u: CurrentUser) => ({ jwt: '', name: '' }),
  authHeaders: () => ({ Authorization: '' })
}

const CurrentUserContext = createContext(defaultValue)

export const useCurrentUser = () => useContext(CurrentUserContext)

export const CurrentUserProvider: Component = (props) => {
  const [currentUser, setCurrentUser] = createSignal<CurrentUser | null>(null)
  const authHeaders = () => ({ Authorization: `Bearer ${currentUser()?.jwt}`})

  return (
    <CurrentUserContext.Provider
      value={{ 
        currentUser, 
        setCurrentUser,
        authHeaders,
      }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  )
}