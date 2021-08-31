import SideNavbar from '../components/SideNavbar'
import type { Component } from "solid-js"

interface MainLayoutProps {
  children: Element | Element[]
}

const MainLayout: Component = (props: MainLayoutProps) => {
  return (
    <div id='main-layout'>
      <SideNavbar />
      <div class='content'>
        { props.children }
      </div>
    </div>
  )
}

export default MainLayout