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
            <NoTeamHolder
                @createTeam="createTeam"
                v-if="this.$store.state.openProject.teams.length === 0"
            />
            <TeamsHolder v-else :teams="teams" />
        </div>
    </div>
</template>

<script>
import Members from '@/components/Projects/Project/MembersDiv.vue';
import NoTeamHolder from '@/components/Teams/NoTeam.vue';
import TeamsHolder from '@/components/Teams/TeamsSection.vue';
import { createTeam } from '@/services/Teams.js';

export default {
    components: {
        Members,
        NoTeamHolder,
        TeamsHolder
    },
    data() {
        return {
            teams: this.$store.state.openProject.teams
        };
    },
    methods: {
        async createTeam(createdTeamName) {
            try {
                const response = await createTeam(
                    createdTeamName,
                    this.$store.state.openProject.projectDetail._id
                );
                this.$store.commit('addToProjectTeams', {
                    name: response.name,
                    id: response.project_id,
                    status: 'admin'
                });
            } catch (err) {
                this.errorText = 'There was an error!';
                this.createdProjectName = null;
            }
        }
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
