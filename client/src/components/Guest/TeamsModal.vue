<template>
    <modal name="teamsModal" @before-open="beforeOpen">
        <div class="teams-div">
            <div class="teams-div-header">Teams</div>
            <div class="teams-div-list" v-if="teams && teams.length !== 0">
                <div class="list-object flex-row" v-for="team in teams" :key="team._id">
                    <span class="list-object-image flex-row">
                        <img
                            :src="
                                team.teamImg
                                    ? require('/home/alperdogan/Desktop/projects/project/server/public/' +
                                          team.teamImg)
                                    : '/team-placeholder.png'
                            "
                        />
                    </span>
                    <span class="list-object-name">{{ team.name }}</span>
                    <div class="flex-row list-object-users">
                        <unicon name="users-alt" width="20" fill="red" />
                        <span>{{ team.admins.length + team.members.length }}</span>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import { fetchProjectDetail } from '@/services/Projects.js';

export default {
    data() {
        return {
            teams: null
        };
    },
    methods: {
        async beforeOpen(event) {
            const projectDetail = await fetchProjectDetail(event.params.projectId);
            this.teams = projectDetail.teamsDetails;
            console.log(this.teams);
        }
    }
};
</script>

<style lang="scss">
.teams-div {
    padding: 1rem;
    &-header {
        border-bottom: 1.5px solid lightgray;
        width: 100%;
        margin-bottom: 0.5rem;
    }
    &-list {
        .list-object {
            align-items: center;
            margin-bottom: 0.7rem;
            &:last-of-type {
                margin: 0;
            }
            &-image {
                margin-right: 0.5rem;
                width: 10%;

                img {
                    width: 100%;
                    height: 50px;
                    border-radius: 50%;
                    background-position: 50% 50%;
                    background-repeat: no-repeat;
                }

                span {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            &-name {
                width: 20%;
            }
            &-users {
                width: 70%;
                align-items: center;
                justify-content: flex-end;
                span {
                    margin-left: 0.5rem;
                }
            }
        }
    }
}
</style>
