<template>
    <div class="teams">
        <div v-for="team in teams" :key="team._id" class="team-div">
            <img
                :src="generateImg(team.teamImg)"
                class="team-div-img"
                @click="goToTeam(team._id)"
            />
            <span>
                {{ team.name }}
            </span>
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
            return img ? require('/home/alperdogan/Desktop/projects/project/server/public/' + img) : '/team-placeholder.png';
        },
        goToTeam(teamId) {
            this.$router.push(`${this.$router.currentRoute.path}/team/${teamId}`);
        }
    }
};
</script>

<style lang="scss">
.teams {
    width: 80%;
    padding: 4rem;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    .team-div {
        margin: 0 0 4rem 2rem;
        height: max-content;
        display: flex;
        flex-flow: column;
        align-items: center;
        border: 1px solid lightgrey;
        padding: 0.4rem;
        padding-bottom: 0;

        &-img {
            width: 12rem;
            height: 180px;
            background-position: 50% 50%;
            background-repeat: no-repeat;
        }

        span {
            margin: 0.4rem 0;
        }

        &:hover {
            cursor: pointer;
            transform: scaleX(1.05) scaleY(1.05);
            transition: 0.2s ease-in-out;
        }
    }
}
</style>
