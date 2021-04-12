const Auth = () => import('../views/AuthenticationPage.vue');
const Mainpage = () => import('../views/MainPage.vue');
const Projectspage = () => import('../views/ProjectsPage.vue');

const routes = [
    {
        path: '/auth',
        component: Auth
    },
    {
        path: '/',
        component: Mainpage,
        children: [
            {
                path: '/',
                component: Projectspage
            }
        ]
    }
];

export default routes;
