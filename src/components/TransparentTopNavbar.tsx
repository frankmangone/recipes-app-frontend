import { styled } from 'solid-styled-components'
import { useNavigate } from 'solid-app-router'
import { useCurrentUser } from '@context/CurrentUserContext'
import api from '@lib/api'
import { status } from '@lib/http-status'
import { colors } from '@lib/colors'
import type { Component } from 'solid-js'

const TransparentTopNavbar: Component = () => {
  const { authHeaders, currentUser, setCurrentUser } = useCurrentUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    api.post('/logout', null, { headers: authHeaders() })
      .then((response) => {
        if (response.status === 200) {
          setCurrentUser(null)
          navigate('/login', { replace: true })
        }
      })
  }

  return (
    <NavbarWrapper>
      <Name>{currentUser()?.name}</Name>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </NavbarWrapper>
  )
}

export default TransparentTopNavbar

/**
 * Styles
 */

const NavbarWrapper = styled('nav')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 0.6rem 1.2rem;
  height: 2.5rem;
  width: calc(100% - 2rem);
  margin-bottom: -3.7rem;
  backdrop-filter: blur(2px);
  z-index: 10;
`

const Name = styled('p')`
  border-right: 1px solid ${colors.primaryUnsaturated[90]};
  color: ${colors.primaryUnsaturated[90]};
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  font-size: 1rem;
  font-weight: bold;
  margin: 0 1rem;
  padding: 0.8rem 1rem;
`

const LogoutButton = styled('button')`
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 5px;
  color: ${colors.white};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.7rem;
  text-decoration: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`
