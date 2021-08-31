import type { Component } from 'solid-js'

import styles from "../assets/SideNavbar.css"

const Navbar: Component = () => {
  return (
    <nav id='side-navbar'>
      <a href='#' class='link'>Collection</a>
      <a href='#' class='link active'>Planning</a>
      <a href='#' class='link'>Recipes</a>
    </nav>
  )
}

export default Navbar