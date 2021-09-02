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
  height: 100vh;
  width: 100vw;
`

const MainContent = styled('div')`
  height: 100%;
  margin-left: 210px;
  overflow-y: scroll;
`
