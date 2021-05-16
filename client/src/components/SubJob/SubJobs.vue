<template>
    <div class="subjobs flex-col">
        <div v-for="subJob in subJobs" :key="subJob._id" class="subJob flex-row">
            <unicon
                name="check-circle"
                :fill="subJob.isFinished ? 'green' : 'black'"
                width="17"
                class="subJob-check"
                @click="changeSubJobStatus(subJob._id, subJob.isFinished)"
            />
            <span class="subJob-name">
                {{ subJob.name }}
            </span>
            <unicon
                name="trash-alt"
                fill="lightgrey"
                class="subJob-remove"
                width="18"
                @click="removeSubJob(subJob._id)"
            />
        </div>
    </div>
</template>

<script>
import { changeSubJobStatus, removeSubJob } from '@/services/Job.js';

export default {
    props: {
        subJobs: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        async changeSubJobStatus(id, status) {
            const response = await changeSubJobStatus(id, !status);
            const object = this.subJobs.find((subJob) => subJob._id === id);
            const index = this.subJobs.findIndex((subJob) => subJob._id === id);
            object.isFinished = response.isJobFinished;
            this.subJobs[index] = object;
        },
        async removeSubJob(id) {
            const response = await removeSubJob(id);
            this.$emit('subJobRemoved', response.subJobId);
        }
    }
};
</script>

<style lang="scss">
.subjobs {
    margin-top: 0.3rem;
    .subJob {
        width: 100%;
        align-items: center;
        border: 1px solid lightgrey;
        border-radius: 0.4rem;
        margin: 0.3rem 0;
        padding: 0 0.3rem;
        justify-content: space-between;

        &-name {
            margin-left: 0.3rem;
            font-size: 0.9rem;
            width: 100%;
        }
        &-check {
            padding-top: 0.2rem;
            cursor: pointer;
            width: 4%;
        }
        &-remove {
            width: 7%;
            text-align: right;
            cursor: pointer;
        }
    }
}
</style>
