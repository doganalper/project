<template>
    <div>TeamMain page</div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('geTeamDetails', this.$router.currentRoute.params.teamId);
    }
};
</script>

<style>
</style>