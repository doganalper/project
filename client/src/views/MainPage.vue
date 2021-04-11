<template>
    <div class="mainpage flex-col" v-if="$store.state.userDataLoading === false">
        <Header :username="$store.state.userData.name" />
        <router-view />
    </div>
</template>

<script>
import Header from '@/components/UI/Header.vue';

export default {
    components: {
        Header
    },
    methods: {},
    mounted() {
        this.$store.dispatch('getUserData');
    }
};
</script>

<style lang="scss"></style>
