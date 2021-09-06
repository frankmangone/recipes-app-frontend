import { styled } from 'solid-styled-components'
import { Link, useLocation } from 'solid-app-router'
import { colors } from '@lib/colors'
import type { Component } from 'solid-js'

const SideNavbar: Component = () => {
  const location = useLocation()

  const linkClasses = (pathname: string) => {
    if (location.pathname === pathname) return 'active'
    return ''
  }

  return (
    <NavbarWrapper>
      <Link href='/collection' class={linkClasses('/collection')}>Collection</Link>
      <Link href='/planning' class={linkClasses('/planning')}>Planning</Link>
      <Link href='/recipes' class={linkClasses('/recipes')}>Recipes</Link>
    </NavbarWrapper>
  )
}

export default SideNavbar

/**
 * Styles
 */

const NavbarWrapper = styled('nav')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: ${colors.primary[70]};
  padding: 5px;
  width: 200px;

  a {
    border-radius: 5px;
    color: ${colors.primary[30]};
    margin-bottom: 8px;
    padding: 15px;
    text-decoration: none;

    &:hover {
      background-color: ${colors.primary[70]};
    }

    &.active {
      background-color: ${colors.primary[60]};
      color: white;
    }
  }
`
