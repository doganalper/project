<template>
    <div class="teams">
        <div v-for="team in teams" :key="team._id">
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
    }
};
</script>

<style lang="scss">
.teams {
    width: 80%;
}
</style>