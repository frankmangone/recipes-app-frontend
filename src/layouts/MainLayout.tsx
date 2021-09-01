import { styled } from 'solid-styled-components'
import SideNavbar from '../components/SideNavbar'
import type { Component } from "solid-js"

interface MainLayoutProps {
  children: Element | Element[]
}

const MainLayout: Component = (props: MainLayoutProps) => {
  return (
    <LayoutWrapper>
      <SideNavbar />
      <MainContent>
        { props.children }
      </MainContent>
    </LayoutWrapper>
  )
}

export default MainLayout

/**
 * Styles
 */

const LayoutWrapper = styled('div')`
  width: 100vw;
  height: 100vh;
`

const MainContent = styled('div')`
  margin-left: 210px;
`
