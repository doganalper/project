<template>
    <modal name="requestsModal" :height="'600'" @before-open="beforeOpen">
        <div class="requests-div">
            <div class="requests-div-header">Requests</div>
            <div class="requests-div-list">
                <div v-if="requestsInfo && requestsInfo.length !== 0">
                    <div
                        class="list-object flex-row"
                        v-for="request in requestsInfo"
                        :key="request._id"
                        @click="openRequestDetail(request._id)"
                    >
                        <span>{{ request.header }}</span>
                        <div class="flex-row info">
                            <span
                                :style="
                                    Math.ceil(
                                        Math.abs(new Date() - new Date(request.dueDate)) /
                                            (1000 * 60 * 60 * 24)
                                    ) < 4
                                        ? { color: 'red' }
                                        : { color: 'green' }
                                "
                                >{{ parseDate(request.dueDate) }}</span
                            >
                            <unicon
                                name="check-circle"
                                :fill="request.isFinished ? 'green' : 'black'"
                                width="17"
                                class="subJob-check"
                            />
                        </div>
                    </div>
                </div>
                <div class="create-request flex-col">
                    <span>Create Request:</span>
                    <div class="main flex-row">
                        <div class="flex-col">
                            <span>Header:</span>
                            <input
                                type="text"
                                v-model="requestHeader"
                                placeholder="Header for request"
                            />
                        </div>
                        <div>
                            <span>Due: </span>
                            <Datepicker
                                v-model="dueDate"
                                @selected="changeDueDate"
                                :monday-first="datePickerConfig.mondayFirst"
                                :disabled-dates="datePickerConfig.disabledDates"
                            />
                        </div>
                        <button @click="createReqHandler">Create Request</button>
                    </div>
                </div>
            </div>
        </div>
        <RequestDetailModal @requestDeleted="requestRemoveHandler" />
    </modal>
</template>

<script>
import { getRequestsByArray, createRequest } from '@/services/Guest.js';
import { fetchProjectDetail } from '@/services/Projects.js';
import RequestDetailModal from '@/components/Guest/RequestDetailModal.vue';
import Datepicker from 'vuejs-datepicker';

export default {
    data() {
        return {
            requestsInfo: null,
            requestHeader: null,
            dueDate: null,
            datePickerConfig: {
                disabledDates: {
                    to: new Date(Date.now() - 1000 * 60 * 60 * 24)
                },
                mondayFirst: true
            },
            projectId: null
        };
    },
    components: {
        RequestDetailModal,
        Datepicker
    },
    methods: {
        async beforeOpen(event) {
            this.projectId = event.params.projectId;
            const response = await fetchProjectDetail(this.projectId);
            const requestIdsArr = response.project.requests;
            const requests = await getRequestsByArray(requestIdsArr);
            this.requestsInfo = requests.infos;
            console.log(this.requestsInfo);
        },
        parseDate(date) {
            return new Date(date).toDateString();
        },
        openRequestDetail(requestId) {
            this.$modal.show('requestDetail', { requestId: requestId });
        },
        requestRemoveHandler(reqId) {
            this.requestsInfo = this.requestsInfo.filter((request) => request._id !== reqId);
            this.$modal.hide('requestDetail');
        },
        changeDueDate(e) {
            this.dueDate = new Date(e).toISOString();
        },
        async createReqHandler() {
            if (this.dueDate && this.requestHeader) {
                const response = await createRequest(this.projectId, {
                    header: this.requestHeader,
                    dueDate: this.dueDate
                });
                this.dueDate = null;
                this.requestHeader = null;
                console.log(response);
                this.requestsInfo.push(response);
            }
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

        .create-request {
            margin-top: 1rem;
            .main {
                margin-top: 0.5rem;
                column-gap: 0.6rem;
                align-items: center;

                button {
                    align-self: flex-end;
                    background-color: greenyellow;
                    border: none;
                    padding: 0.21rem 0.8rem;
                    cursor: pointer;
                }
            }
        }

        &:last-of-type {
            margin: 0;
        }
    }
}
</style>
