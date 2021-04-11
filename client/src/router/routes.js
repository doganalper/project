const Auth = () => import('../views/AuthenticationPage.vue');
const Mainpage = () => import('../views/MainPage.vue');

const routes = [
    {
        path: '/auth',
        component: Auth
    },
    {
        path: '/',
        component: Mainpage,
        children: []
    }
];

export default routes;
