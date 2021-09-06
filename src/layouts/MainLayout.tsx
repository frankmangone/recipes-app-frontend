import { styled } from 'solid-styled-components'
import SideNavbar from '@components/SideNavbar'
import TopNavbar from '@components/TopNavbar'
import type { Component } from "solid-js"

interface MainLayoutProps {
  children: Element | Element[]
}

const MainLayout: Component = (props: MainLayoutProps) => {
  return (
    <LayoutWrapper>
      <SideNavbar />
      <MainContentWrapper>
        <TopNavbar />
        <MainContent>
          {props.children}
        </MainContent>
      </MainContentWrapper>
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

const MainContentWrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-left: 210px;
  overflow-y: scroll;
`

const MainContent = styled('div')`
  padding: 1rem;
`
