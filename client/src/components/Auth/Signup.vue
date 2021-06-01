<template>
    <div class="signup flex-col">
        <label for="name">İsim</label>
        <input type="text" v-model="userdata.name" name="name" />
        <label for="surname">Soyisim</label>
        <input type="text" v-model="userdata.surname" name="surname" />
        <label for="email">Email</label>
        <input type="email" v-model="userdata.email" name="email" />
        <label for="password">Şifre</label>
        <input type="password" v-model="userdata.password" name="password" />
        <label for="password-confirm">Şifre Tekrarı</label>
        <input type="password" v-model="userdata.passwordConfirm" name="password-confirm" />
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
        <button @click="signuphandler">Kayıt ol</button>
        <span v-if="errorText">
            {{ errorText }}
        </span>
    </div>
</template>

<script>
import { signup } from '@/services/Auth.js';
import { signupAsGuest } from '@/services/Guest.js';
import { saveAuthToken } from '@/utils/localstorage.js';

export default {
    data() {
        return {
            userdata: {
                name: null,
                surname: null,
                email: null,
                password: null,
                passwordConfirm: null
            },
            errorText: null,
            type: null
        };
    },
    methods: {
        async signuphandler() {
            if (!this.type) {
                return (this.errorText = 'Choose User Type');
            }
            this.errorText = null;
            for (const key in this.userdata) {
                const data = this.userdata[key];
                if (!data) {
                    return (this.errorText = 'Fields cannot be empty!');
                }
            }
            if (this.type === 'guest') {
                try {
                    const response = await signupAsGuest(this.userdata);
                    saveAuthToken(response.accessToken);
                    localStorage.setItem('userType', response.userType);
                    this.$router.push('/');
                } catch (error) {
                    return (this.errorText = 'There was an error :(');
                }
            } else {
                try {
                    const response = await signup(this.userdata);
                    saveAuthToken(response.accessToken);
                    localStorage.setItem('userType', response.userType);
                    this.$router.push('/');
                } catch (error) {
                    return (this.errorText = 'There was an error :(');
                }
            }
        }
    },
    watch: {
        type: (val) => {
            console.log(val);
        }
    }
};
</script>

<style lang="scss">
.signup {
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
