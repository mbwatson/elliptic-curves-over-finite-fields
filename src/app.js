import { Routes, Route } from 'react-router-dom'
import { GraphView, NotFoundView } from './views'
import { Layout } from './components/layout'

const Router = () => {
  return (
    <Routes>
      <Route element={ <GraphView /> } path="/" />
      <Route element={ <NotFoundView /> } path="*" />
    </Routes>
  )
}

export const App = () => {
  return (
    <Layout>
      <Router />
    </Layout>
  )
}
