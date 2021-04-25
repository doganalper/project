const Auth = () => import('../views/AuthenticationPage.vue');
const Mainpage = () => import('../views/MainPage.vue');
const Projectspage = () => import('../views/ProjectsPage.vue');
const ProjectMain = () => import('../views/Project/ProjectMain.vue');

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
            },
            {
                path: '/project/:projectId',
                component: ProjectMain
            }
        ]
    }
];

export default routes;
