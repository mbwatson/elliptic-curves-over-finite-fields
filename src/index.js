import { App } from './app'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppContextProvider } from './context'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<AppContextProvider><App /></AppContextProvider>)
