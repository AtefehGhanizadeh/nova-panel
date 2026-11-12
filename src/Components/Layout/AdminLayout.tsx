import { Outlet } from 'react-router'
import styled from 'styled-components'
import { Header } from '@/Components/Layout/Header'
import { Sidebar } from '@/Components/Layout/Sidebar'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-inline-start: ${({ theme }) => theme.layout.sidebarWidth};
`

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.space.xxl};
`

export function AdminLayout() {
  return (
    <>
      <Sidebar />
      <Content>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </>
  )
}
