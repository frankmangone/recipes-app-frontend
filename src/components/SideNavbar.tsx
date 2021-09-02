import { styled } from 'solid-styled-components'
import { Link, useLocation } from 'solid-app-router'
import type { Component } from 'solid-js'

const Navbar: Component = () => {
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

export default Navbar

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
  background-color: hsl(25, 100%, 70%);
  padding: 5px;
  width: 200px;

  a {
    border-radius: 5px;
    color: hsl(25, 100%, 30%);
    margin-bottom: 8px;
    padding: 15px;
    text-decoration: none;

    &:hover {
      background-color: hsl(25, 100%, 65%);
    }

    &.active {
      background-color: hsl(25, 100%, 60%);
      color: white;
    }
  }
`
