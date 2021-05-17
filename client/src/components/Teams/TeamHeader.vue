<template>
    <div class="team-header">
        <div class="team-header-name">
            <b>Takım: </b> {{ $store.state.openTeam.teamDetail.name }}
            <div class="change-div" v-if="$store.state.userData.isAdmin">
                <transition name="input">
                    <input
                        type="text"
                        v-model="newName"
                        v-show="isRenameOpen"
                        placeholder="Press enter to change"
                        @keyup.enter="changeTeamName"
                    />
                </transition>
                <unicon
                    name="pen"
                    fill="royalblue"
                    class="pen"
                    width="15"
                    @click="isRenameOpen = !isRenameOpen"
                />
            </div>
        </div>
        <unicon
            name="cog"
            fill="royalblue"
            class="pen"
            width="15"
            @click="setSettings"
            v-if="$store.state.userData.isAdmin"
        />
        <div class="" v-else>{{ $store.state.openTeam.teamDetail.description }}</div>
    </div>
</template>

<script>
import { changeTeamDetails } from '@/services/Teams';

export default {
    data() {
        return {
            isRenameOpen: false,
            newName: null
        };
    },
    methods: {
        setSettings() {
            this.$emit('setSettingsPanel');
        },
        async changeTeamName() {
            if (this.newName) {
                const newDetail = await changeTeamDetails(
                    this.$store.state.openTeam.teamDetail._id,
                    { name: this.newName }
                );
                this.$store.commit('changeTeamDetail', newDetail);
                this.newName = null;
                this.isRenameOpen = null;
            }
        }
    }
};
</script>

<style lang="scss">
.team-header {
    background-color: rgb(247, 247, 247);
    border-bottom: 1px solid lightgray;
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;

    &-name {
        display: flex;
        align-items: center;

        .change-div {
            margin-left: 0.5rem;
            display: flex;
        }
    }

    input {
        margin: 0 0.5rem;
    }
}
</style>
