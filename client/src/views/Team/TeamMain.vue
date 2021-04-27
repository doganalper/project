<template>
    <div class="team-main full-screen">
        <TeamHeader @setSettingsPanel="setSettingsPanel" />
        <TeamSettings v-if="isSettingsOpen" />
        <!-- Stages part will be down here -->
        <div>A</div>
    </div>
</template>

<script>
import TeamHeader from '@/components/Teams/TeamHeader.vue';
import TeamSettings from '@/components/Teams/TeamsSettings.vue';

export default {
    data() {
        return {
            isSettingsOpen: false
        };
    },
    components: {
        TeamHeader,
        TeamSettings
    },
    methods: {
        setSettingsPanel() {
            this.isSettingsOpen = !this.isSettingsOpen;
        }
    },
    mounted() {
        this.$store.dispatch('geTeamDetails', this.$router.currentRoute.params.teamId);
    }
};
</script>

<style lang="scss">
.team-main {
    display: flex;
    flex-flow: column;
}
</style>
