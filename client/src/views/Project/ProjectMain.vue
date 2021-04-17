<template>
    <div class="project-main">
        {{ $store.state.openProject.projectDetail.name }}
        {{ $store.state.openProject.projectDetail.teams.length }}
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('getProjectDetail', this.$route.params.projectId);
    }
};
</script>

<style lang="scss">
.project-main {
}
</style>
