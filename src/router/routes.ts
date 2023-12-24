import React, { lazy } from 'react'
export type IRoute = {
    path: string
    name: string
    component: React.FC
    meta: {
        title?: string
    }
    children?: IRoute[]
}
const routes: IRoute[] = [
    {
        path: '/',
        name: 'home',
        component: lazy(() => import('Pages/Home')),
        meta: {
            title: '首页',
        },
    },
    {
        path: '/detail',
        name: 'detail',
        component: lazy(() => import('Pages/Detail')),
        meta: {
            title: '详情页',
        },
        children: [
            {
                path: '/detail/type',
                name: 'detailType',
                component: lazy(() => import('Pages/Type')),
                meta: {
                    title: '详情页1',
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: lazy(() => import('Pages/Login')),
        meta: {
            title: '登录',
        },
    },
]

export default routes
