const Auth = () => import('../views/AuthenticationPage.vue');
const Mainpage = () => import('../views/MainPage.vue');

const routes = [
    {
        path: '/',
        component: Auth
    },
    {
        path: '/main-page',
        component: Mainpage
    }
];

export default routes;
