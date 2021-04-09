<template>
    <div class="signin flex-col">
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email" />
        <label for="password">Password</label>
        <input type="password" v-model="password" name="password" />
        <button @click="signinhandler">Signin</button>
        <span v-if="errorText">
            {{ errorText }}
        </span>
    </div>
</template>

<script>
import { signin } from '@/services/Auth.js';
import { saveAuthToken } from '@/utils/localstorage.js';

export default {
    data() {
        return {
            email: null,
            password: null,
            errorText: null
        };
    },
    methods: {
        async signinhandler() {
            if (!this.email || !this.password) return (this.errorText = 'Fields cannot be empty!');

            const payload = {
                email: this.email,
                password: this.password
            };
            try {
                // response.accessToken dönüyor.
                const response = await signin(payload);
                saveAuthToken(response.accessToken);
            } catch (err) {
                return (this.errorText = 'User not found!');
            }
        }
    }
};
</script>

<style lang="scss">
.signin {
    label {
        font-size: 1.1rem;
        color: rgb(71, 71, 71);
        font-weight: 600;
        margin-top: 0.5rem;
    }
    input {
        padding: 0.3rem 0.5rem;
        font-size: 1rem;
    }
    button {
        margin-top: 1rem;
        padding: 0.4rem 0;
        font-size: 1.2rem;
        font-weight: 600;
        background-color: rgb(165, 226, 42);
        border: yellowgreen;
        cursor: pointer;
    }
    span {
        color: rgb(248, 76, 76);
        font-weight: 700;
        margin-top: 1rem;
    }
}
</style>
