import { styled } from 'solid-styled-components'
import { useNavigate } from 'solid-app-router'
import { useCurrentUser } from '@context/CurrentUserContext'
import api from '@lib/api'
import { status } from '@lib/http-status'
import { colors } from '@lib/colors'
import type { Component } from 'solid-js'

const TopNavbar: Component = () => {
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

export default TopNavbar

/**
 * Styles
 */

const NavbarWrapper = styled('nav')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${colors.primaryUnsaturated[90]};
  padding: 0.6rem 1.2rem;
  width: calc(100% - 2rem);
`

const Name = styled('p')`
  border-right: 1px solid ${colors.primaryUnsaturated[60]};
  color: ${colors.primaryUnsaturated[40]};
  font-size: 1rem;
  margin: 0 1rem;
  padding: 0.8rem 1rem;
`

const LogoutButton = styled('button')`
  background-color: ${colors.primaryUnsaturated[80]};
  border: none;
  border-radius: 5px;
  color: ${colors.primaryUnsaturated[10]};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.7rem;
  text-decoration: none;

  &:hover {
    background-color: ${colors.primaryUnsaturated[70]};
  }
`
