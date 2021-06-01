<template>
    <modal name="guestsModal" :height="'auto'" @before-open="beforeOpen">
        <div class="members-div">
            <div class="members-div-header">Guests</div>
            <div class="members-div-list" v-if="guestInfos && guestInfos.length !== 0">
                <div class="list-object flex-row" v-for="guest in guestInfos" :key="guest._id">
                    <span>{{ parseName(guest.name, guest.surname) }}</span>
                </div>
            </div>
            <div v-else>This project doesn't have any guests yet!</div>
        </div>
    </modal>
</template>

<script>
import { fetchProjectDetail } from '@/services/Projects.js';
import { getGuestsByArray } from '@/services/Guest.js';

export default {
    data() {
        return {
            guestInfos: null
        };
    },
    methods: {
        async beforeOpen(event) {
            const response = await fetchProjectDetail(event.params.projectId);
            const guestIdsArr = response.project.guests;
            console.log(guestIdsArr);
            const guestInfosResponse = await getGuestsByArray(guestIdsArr);
            const guestInfos = guestInfosResponse.infos;
            console.log(guestInfos);
            this.guestInfos = guestInfos;
        },
        parseName(name, surname) {
            return `${name} ${surname}`;
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
