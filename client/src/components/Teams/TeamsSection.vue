<template>
    <div class="teams">
        {{ $store.state.openProject.teams.length }}
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