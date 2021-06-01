<template>
    <modal name="membersModal" :height="'auto'" @before-open="beforeOpen">
        <div class="members-div">
            <div class="members-div-header">Üyeler</div>
            <div class="members-div-list" v-if="members && members.length !== 0">
                <div class="list-object flex-row" v-for="member in members" :key="member._id">
                    <span class="list-object-image flex-row">
                        <span v-if="!member.userImage">{{
                            parseFirsts(member.name, member.surname)
                        }}</span>
                        <img
                            :src="
                                require('/home/alperdogan/Desktop/projects/project/server/public/' +
                                    member.userImage)
                            "
                            v-else
                        />
                    </span>
                    <span>{{ parseName(member.name, member.surname) }}</span>
                </div>
            </div>
            <div v-else>Bu projede daha üye bulunmamaktadır!</div>
        </div>
    </modal>
</template>

<script>
import { fetchProjectDetail } from '@/services/Projects.js';

export default {
    data() {
        return {
            members: null
        };
    },
    methods: {
        async beforeOpen(event) {
            const response = await fetchProjectDetail(event.params.projectId);
            const cleanArray = response.projectMembers.map((member) => member.info);
            this.members = cleanArray;
        },
        parseName(name, surname) {
            return `${name} ${surname}`;
        },
        parseFirsts(name, surname) {
            return `${name.charAt(0)}${surname.charAt(0)}`;
        }
    }
};
</script>

<style lang="scss">
.members-div {
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
        }
    }
}
</style>
