import { useEffect, useState } from 'react'
import './app.scss'

type App = {
    name?: string
}
const App = (props: App) => {
    console.log(props)
    const [name] = useState([])
    useEffect(() => {
        console.log(name)
    }, [name])
    useEffect(() => {
        console.log(name)
    }, [name])
    return <div>sdasd</div>
}

export default App
