import { createEffect } from 'solid-js'
import { useNavigate } from 'solid-app-router'
import { useCurrentUser } from "@context/CurrentUserContext"

const usePrivateRoute = (): void => {
  const { currentUser, sessionStarted } = useCurrentUser()
  const navigate = useNavigate()

  createEffect(() => {
    if (!sessionStarted()) return
    if (!currentUser()?.jwt) {
      navigate('/login', { replace: true })
    }
  })
}

export default usePrivateRoute