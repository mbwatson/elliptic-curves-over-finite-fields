import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { GraphView, InfoView, NotFoundView } from './views'
import './index.css'

const Router = () => {
  return (
    <Routes>
      <Route element={ <GraphView /> } path="/" />
      <Route element={ <InfoView /> } path="/info" />
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
