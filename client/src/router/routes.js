const Auth = () => import('@/views/AuthenticationPage.vue');
const Mainpage = () => import('@/views/MainPage.vue');
const Projectspage = () => import('@/views/ProjectsPage.vue');
const ProjectMain = () => import('@/views/Project/ProjectMain.vue');
const TeamMain = () => import('@/views/Team/TeamMain.vue');
const Profile = () => import('@/views/UserProfile.vue');
const GuestProjects = () => import('@/views/Guest/Projects.vue');

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
                path: '/guest',
                component: GuestProjects
            },
            {
                path: '/project/:projectId',
                component: ProjectMain
            },
            {
                path: '/project/:projectId/team/:teamId',
                component: TeamMain
            },
            {
                path: '/profile',
                component: Profile
            }
        ]
    }
];

export default routes;
