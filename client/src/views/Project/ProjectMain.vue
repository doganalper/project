<template>
    <div class="project-main">
        <!-- Project Header -->
        <div class="project-main-header">
            <b>Proje:</b> {{ $store.state.openProject.projectDetail.name }}
        </div>
        <!-- Project Teams -->
        <!-- TODO: Change this part for creating new teams and routing to team main page -->
        <div class="flex-row">
            <Members :members="$store.state.openProject.members" />
        </div>
    </div>
</template>

<script>
import Members from '@/components/Projects/Project/MembersDiv.vue';

export default {
    components: {
        Members
    },
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
