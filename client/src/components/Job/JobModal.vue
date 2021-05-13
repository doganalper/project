<template>
    <modal name="jobModal" @before-open="beforeOpen">
        <div v-if="jobInfo" class="job-info flex-col">
            <div class="job-info-name flex-row">
                <span>{{ jobInfo.name }}</span>
                <unicon
                    name="check-circle"
                    :fill="jobInfo.isFinished ? 'green' : 'black'"
                    @click="changeJobStatusHandler"
                ></unicon>
            </div>
            <div class="job-info-assign">
                Assigned To:
                <select v-model="assignedUser" @change="assignUser">
                    <option :value="null">
                        No one
                    </option>
                    <option :value="user.info._id" v-for="user in getUsersThatCanTakeJobs" :key="user.info._id">
                        {{fetchName(user.info)}}
                    </option>
                </select>
            </div>
            <div class="job-info-date">Finish Date: {{ parseInfo(jobInfo.dueDate) }}</div>
            <div class="job-info-description flex-col">
                <span>Description:</span>
                {{ parseInfo(jobInfo.description) }}
            </div>
        </div>
        <div v-else>Loading...</div>
    </modal>
</template>

<script>
import { getJobInfo, changeJobStatus, changeJobAssigned } from '@/services/Job.js';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            jobInfo: null,
            assignedUser: null
        };
    },
    methods: {
        closeModal() {
            this.$modal.hide('jobModal');
        },
        async beforeOpen(event) {
            const jobInfo = await getJobInfo(event.params.jobId);
            console.log(jobInfo);
            this.jobInfo = jobInfo;
            this.assignedUser = jobInfo.assignedId;
        },
        parseInfo(info) {
            return info ? info : 'Empty';
        },
        fetchName(info) {
            return `${info.name} ${info.surname}`
        },
        async changeJobStatusHandler() {
            const newStatus = await changeJobStatus(this.jobInfo._id, !this.jobInfo.isFinished);
            this.jobInfo['isFinished'] = newStatus.isFinished;
            this.$store.commit('changeJobStatus', {
                jobId: this.jobInfo._id,
                status: newStatus.isFinished,
                stageId: this.jobInfo.stageId
            });
        },
        async assignUser(e) {
            const value = e.target.value;
            await changeJobAssigned(this.jobInfo._id, value.length === 0 ? null : value);
        }
    },
    computed: {
        ...mapGetters(['getUsersThatCanTakeJobs'])
    }
};
</script>

<style lang="scss">
.job-info {
    padding: 1rem;
    font-size: 0.95rem;

    &-name {
        font-size: 1.2rem;
        width: 100%;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid black;
        font-weight: 600;
        justify-content: space-between;
        align-items: center;
    }

    &-assign {
        margin: 0.4rem 0;
    }

    &-description {
        margin: 0.4rem 0;
    }

    &-assign {
        select {
            width: 25%;
            padding: 0.3rem 0.1rem;
            font-size: 0.87rem;
        }
    }
}
</style>
