import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { getAccessToken } from '@/utils/localstorage.js';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

// Access token check for non start pages.
router.beforeEach((to, from, next) => {
    if (to.fullPath !== '/') {
        const token = getAccessToken();
        if (!token) {
            next('/');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
