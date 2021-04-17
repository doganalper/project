<template>
    <div class="project-main">
        <!-- Project Header -->
        <div class="project-main-header">
            <b>{{ $store.state.openProject.projectDetail.name }}</b>
        </div>
        <!-- Project Teams -->
        <!-- TODO: Change this part for creating new teams and routing to team main page -->
        <div>
            <b v-for="team in $store.state.openProject.teams" :key="team.id">
                {{ team.name }}
            </b>
        </div>
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
    display: flex;
    flex-flow: column;

    &-header {
        background-color: rgb(247, 247, 247);
        border-bottom: 1px solid lightgray;
        padding: 0.8rem 1.2rem;
        font-size: 0.9rem;
    }
}
</style>
