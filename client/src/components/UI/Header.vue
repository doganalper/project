<template>
    <div class="header flex-row">
        <div class="logo" @click="routeToMain">Project</div>
        <div class="buttons-part flex-row">
            <div
                class="button"
                @click="routeToProfile"
                v-if="!$route.path.includes('profile') && !getUser()"
            >
                My Profile
            </div>
            <div
                class="button"
                @click="routeToMain"
                v-if="$route.path.includes('profile') && !getUser()"
            >
                My Projects
            </div>
            <div class="button" @click="logout">Logout</div>
        </div>
    </div>
</template>

<script>
import { removeToken } from '@/utils/localstorage.js';

export default {
    methods: {
        logout() {
            removeToken();
            this.$router.push('/auth');
        },
        routeToMain() {
            this.$router.push('/');
        },
        routeToProfile() {
            this.$router.push('/profile');
        },
        getUser() {
            return localStorage.getItem('userType') === 'guest';
        }
    }
};
</script>

<style lang="scss">
.header {
    width: 100%;
    background-color: rgb(214, 166, 10);
    padding: 0.9rem 1.1rem;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    .logo {
        cursor: pointer;
    }

    .buttons-part {
        font-weight: 600;
        font-size: 1.1rem;
        color: white;

        .button {
            margin-left: 1.1rem;
            transition: all 0.1s;

            &:hover {
                cursor: pointer;
                transform: scale(1.1);
            }
        }
    }
}
</style>
