<template>
    <div class="full-screen screen-center auth-main">
        <div class="card flex-col">
            <div class="tab-select flex-row">
                <span
                    :class="tab === 'signin' && 'openTab'"
                    class="border-left"
                    @click="setTab('signin')"
                    >Giriş Yap</span
                >
                <span
                    :class="tab === 'signup' && 'openTab'"
                    class="border-right"
                    @click="setTab('signup')"
                    >Kayıt Ol</span
                >
            </div>
            <div class="card-content">
                <Signin v-if="tab === 'signin'" />
                <Signup v-if="tab === 'signup'" />
            </div>
        </div>
    </div>
</template>

<script>
import Signin from '@/components/Auth/Signin.vue';
import Signup from '@/components/Auth/Signup.vue';

export default {
    components: {
        Signin,
        Signup
    },
    data() {
        return {
            tab: 'signin'
        };
    },
    methods: {
        setTab(tab) {
            this.tab = tab;
        }
    }
};
</script>

<style lang="scss">
.auth-main {
    background-color: rgba(223, 163, 86, 0.4);

    .card {
        border: 1px solid black;
        width: 20%;
        height: auto;
        border-radius: 1rem;

        &-content {
            box-sizing: border-box;
            padding: 1rem;
        }
    }

    .tab-select {
        justify-content: space-evenly;
        border-bottom: 1px solid black;

        span {
            font-size: 1.1rem;
            font-weight: 600;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            padding: 0.5rem 1rem;
            cursor: pointer;
        }

        .border {
            &-left {
                border-top-left-radius: 1rem;
            }

            &-right {
                border-top-right-radius: 1rem;
            }
        }

        .openTab {
            background-color: black;
            color: white;
        }
    }
}
</style>
