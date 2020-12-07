const Login = () => import('./views/Login')
const Index = () => import('./views/Index')
const Home = () => import('./views/Home')

export default [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                name: 'Index',
                component: Index,
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            public: true
        }
    },
    {
        path: '*',
        redirect: '/'
    }
]
