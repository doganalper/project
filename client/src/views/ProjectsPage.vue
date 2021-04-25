<template>
    <no-project @createProject="createProject" v-if="projects.length === 0" />
    <projects-section v-else :projects="projects" @createProject="createProject" />
</template>

<script>
import { createProject } from '@/services/Projects.js';
import NoProject from '@/components/Projects/NoProject.vue';
import ProjectsSection from '@/components/Projects/ProjectsSection.vue';

export default {
    components: {
        NoProject,
        ProjectsSection
    },
    data() {
        return {
            projects: this.$store.state.userData.projects
        };
    },
    methods: {
        async createProject(projectName) {
            try {
                const response = await createProject(projectName);
                this.$store.commit('addToUserProjects', {
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
        this.$store.commit('setProjectDetail', null);
    }
};
</script>

<style lang="scss"></style>
