<template>
    <div class="project-main flex-col">
        <ProjectHeader />
        <div class="flex-row">
            <Members :members="$store.state.openProject.members" />
            <NoTeamHolder
                @createTeam="createTeam"
                v-if="this.$store.state.openProject.teams.length === 0"
            />
            <TeamsHolder v-else :teams="this.$store.state.openProject.teams" />
        </div>
    </div>
</template>

<script>
import Members from '@/components/Projects/Project/MembersDiv.vue';
import NoTeamHolder from '@/components/Teams/NoTeam.vue';
import TeamsHolder from '@/components/Teams/TeamsSection.vue';
import ProjectHeader from '@/components/Projects/ProjectHeader.vue';
import { createTeam } from '@/services/Teams.js';

export default {
    components: {
        Members,
        NoTeamHolder,
        TeamsHolder,
        ProjectHeader
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
