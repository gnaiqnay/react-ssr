import { Route, Routes } from 'react-router-dom'
import routes, { type IRoute } from './routes'
import { Suspense } from 'react'

const WrapElement = (props: IRoute) => {
    const { name, component: Component, meta } = props
    document.title = meta?.title || name
    return <Component />
}
const renderRoutes = (routes: IRoute[]) => {
    return routes.map(route => {
        if (route.children && route.children.length > 0) {
            return (
                <Route key={route.name} path={route.path} element={<WrapElement {...route} />}>
                    {renderRoutes(route.children)}
                </Route>
            )
        }
        return <Route key={route.name} path={route.path} element={<WrapElement {...route} />} />
    })
}
const RouterView = () => {
    return (
        <Suspense fallback={null}>
            <Routes>{renderRoutes(routes)}</Routes>
        </Suspense>
    )
}

export default RouterView
