<template>
    <div class="signin flex-col">
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email" />
        <label for="password">Şifre</label>
        <input type="password" v-model="password" name="password" />
        <div class="buttons flex-row">
            <div>
                <input type="radio" name="type" value="user" v-model="type" />
                <label for="yes">Kullanıcı</label>
            </div>
            <div>
                <input type="radio" name="type" value="guest" v-model="type" />
                <label for="yes">Misafir</label>
            </div>
        </div>
        <button @click="signinhandler">Giriş Yap</button>
        <span v-if="errorText">
            {{ errorText }}
        </span>
    </div>
</template>

<script>
import { signin } from '@/services/Auth.js';
import { loginAsGuest } from '@/services/Guest.js';
import { saveAuthToken } from '@/utils/localstorage.js';

export default {
    data() {
        return {
            email: null,
            password: null,
            errorText: null,
            type: null
        };
    },
    methods: {
        async signinhandler() {
            if (!this.email || !this.password) return (this.errorText = 'Fields cannot be empty!');

            const payload = {
                email: this.email,
                password: this.password
            };
            if (this.type === 'guest') {
                try {
                    const response = await loginAsGuest(payload);
                    saveAuthToken(response.accessToken);
                    localStorage.setItem('userType', response.userType);
                    this.$router.push('/guest');
                } catch (err) {
                    console.log('AAA');
                    return (this.errorText = 'User not found!');
                }
            } else {
                try {
                    const response = await signin(payload);
                    saveAuthToken(response.accessToken);
                    localStorage.setItem('userType', response.userType);
                    this.$router.push('/');
                } catch (err) {
                    console.log('BBB');
                    return (this.errorText = 'User not found!');
                }
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

    .buttons {
        margin-top: 0.5rem;
        div {
            margin-left: 1rem;
            input {
                margin-right: 0.3rem;
            }
        }
    }
}
</style>
