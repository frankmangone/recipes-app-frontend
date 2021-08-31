import Navbar from '../components/Navbar'
import type { Component } from "solid-js"

interface MainLayoutProps {
  children: Element | Element[]
}

const MainLayout: Component = (props: MainLayoutProps) => {
  return (
    <div>
      <Navbar />
      { props.children }
    </div>
  )
}

export default MainLayout