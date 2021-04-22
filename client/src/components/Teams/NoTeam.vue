<template>
    <div class="no-team screen-center flex-col">
        <img src="/svg/searching.svg" />
        <span class="no-team-text">
            Looks like you don't have any teams. <b>Create one now!</b>
        </span>
        <div class="create-team flex-col">
            <div v-if="showCreateInput" class="flex-col">
                <input v-if="!errorText" type="text" v-model="createdTeamName" class="team-input" />
                <span v-if="errorText">{{ errorText }}</span>
            </div>
            <button @click="showCreateDiv">Create a team now</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showCreateInput: false,
            createdTeamName: null,
            errorText: null
        };
    },
    methods: {
        showCreateDiv() {
            this.errorText = null;
            if (this.createdTeamName) this.$emit('createTeam', this.createdTeamName);
            else this.showCreateInput = !this.showCreateInput;
        }
    }
};
</script>

<style lang="scss">
.no-team {
    width: 80%;
    &-text {
        display: flex;
        flex-flow: column;
        align-items: center;
        margin: 1rem 0;
    }

    .create-team {
        margin-top: 1rem;
        .team-input {
            font-size: 1.1rem;
            padding: 0.05rem 0.5rem;
        }

        button {
            margin-top: 1rem;
            border: greenyellow;
            border-radius: 1rem;
            padding: 0.5rem 1rem;
            background-color: greenyellow;
            font-size: 1.2rem;
            cursor: pointer;
        }
    }
}
</style>