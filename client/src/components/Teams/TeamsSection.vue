<template>
    <div class="teams">
        <div v-for="team in teams" :key="team._id" class="team-div">
            <img
                :src="generateImg(teams.teamImg)"
                class="team-div-img"
                @click="goToTeam(team._id)"
            />
            {{ team.name }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        teams: {
            type: Array,
            required: true
        }
    },
    methods: {
        generateImg(img) {
            return img ? img : '/team-placeholder.png';
        },
        goToTeam(teamId) {
            this.$router.push(`/team/${teamId}`);
        }
    }
};
</script>

<style lang="scss">
.teams {
    width: 80%;
    padding: 5rem;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    .team-div {
        margin: 0 0 4rem 2rem;
        height: max-content;
        display: flex;
        flex-flow: column;
        align-items: center;

        &-img {
            width: 12rem;
        }

        &:hover {
            cursor: pointer;
            transform: scaleX(1.05) scaleY(1.05);
            transition: 0.2s ease-in-out;
        }
    }
}
</style>
