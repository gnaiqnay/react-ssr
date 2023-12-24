import ErrorBoundary from 'Components/ErrorBoundary'
import { BrowserRouter } from 'react-router-dom'
import RouterView from '@/router'
import './app.scss'

const App = () => {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <RouterView />
            </BrowserRouter>
        </ErrorBoundary>
    )
}

export default App
