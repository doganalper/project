<template>
    <div class="mainpage flex-col" v-if="$store.state.userDataLoading === false">
        <Header :username="$store.state.userData.name" />
        <router-view />
    </div>
    <div v-else>AAAA</div>
</template>

<script>
import Header from '@/components/UI/Header.vue';

export default {
    components: {
        Header
    },
    methods: {},
    mounted() {
        if (localStorage.getItem('userType') === 'guest') {
            this.$store.dispatch('getGuestData');
        } else {
            this.$store.dispatch('getUserData');
        }
    }
};
</script>

<style lang="scss"></style>
