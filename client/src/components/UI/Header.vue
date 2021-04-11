<template>
    <div class="header flex-row">
        <div class="username">
            {{ username }}
        </div>
        <div class="buttons-part flex-row">
            <div class="button">My Profile</div>
            <div class="button" @click="logout">Logout</div>
        </div>
    </div>
</template>

<script>
import { removeToken } from '@/utils/localstorage.js';

export default {
    props: {
        username: {
            type: String,
            required: true
        }
    },
    methods: {
        logout() {
            removeToken();
            this.$router.push('/auth');
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
