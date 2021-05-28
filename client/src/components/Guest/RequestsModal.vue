<template>
    <modal name="requestsModal" @before-open="beforeOpen">
        <div class="requests-div">
            <div class="requests-div-header">Requests</div>
            <div class="requests-div-list" v-if="requestsInfo && requestsInfo.length !== 0">
                <div
                    class="list-object flex-row"
                    v-for="request in requestsInfo"
                    :key="request._id"
                    @click="openRequestDetail(request._id)"
                >
                    <span>{{ request.header }}</span>
                    <div class="flex-row info">
                        <span>{{ parseDate(request.dueDate) }}</span>
                        <unicon
                            name="check-circle"
                            :fill="request.isFinished ? 'green' : 'black'"
                            width="17"
                            class="subJob-check"
                        />
                    </div>
                </div>
            </div>
        </div>
        <RequestDetailModal />
    </modal>
</template>

<script>
import { getRequestsByArray } from '@/services/Guest.js';
import { fetchProjectDetail } from '@/services/Projects.js';
import RequestDetailModal from '@/components/Guest/RequestDetailModal.vue';

export default {
    data() {
        return {
            requestsInfo: null
        };
    },
    components: {
        RequestDetailModal
    },
    methods: {
        async beforeOpen(event) {
            const response = await fetchProjectDetail(event.params.projectId);
            const requestIdsArr = response.project.requests;
            console.log(requestIdsArr);
            const requests = await getRequestsByArray(requestIdsArr);
            this.requestsInfo = requests.infos;
            console.log(this.requestsInfo);
        },
        parseDate(date) {
            return new Date(date).toDateString();
        },
        openRequestDetail(requestId) {
            this.$modal.show('requestDetail', { requestId: requestId });
        }
    }
};
</script>

<style lang="scss">
.requests-div {
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
            justify-content: space-between;
            border: 1px solid lightgray;
            padding: 0.3rem 0.7rem;
            border-radius: 0.5rem;
            cursor: pointer;

            .info {
                align-items: center;
                span {
                    margin-right: 0.5rem;
                    font-size: 0.85rem;
                }
            }
        }
        &:last-of-type {
            margin: 0;
        }
    }
}
</style>
