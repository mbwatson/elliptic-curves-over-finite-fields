import { App } from './app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from './context'
import { DrawerProvider } from './components/drawer'
import './index.css'
import 'rsuite/dist/rsuite.min.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter basename={ process.env.NODE_ENV === 'production' ? '/elliptic-curves-over-finite-fields' : '' }>
    <DrawerProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </DrawerProvider>
  </BrowserRouter>
)
