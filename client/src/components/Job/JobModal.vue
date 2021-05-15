<template>
    <modal name="jobModal" @before-open="beforeOpen" :height="'auto'" :scrollable="true">
        <div v-if="jobInfo" class="job-info flex-col">
            <div class="job-info-name flex-row">
                <div class="flex-row" :style="{ alignItems: 'center' }">
                    <span :style="{ marginRight: '0.3rem' }">{{ jobInfo.name }}</span>
                    <transition name="input">
                        <input
                            type="text"
                            :style="{ height: '1.4rem', marginRight: '0.3rem' }"
                            v-model="rename.newName"
                            v-show="rename.isOpen"
                            placeholder="Press enter to change"
                            @keyup.enter="changeInfo"
                        />
                    </transition>
                    <unicon
                        name="pen"
                        fill="royalblue"
                        class="pen"
                        width="15"
                        @click="rename.isOpen = !rename.isOpen"
                    />
                </div>
                <unicon
                    name="check-circle"
                    :fill="jobInfo.isFinished ? 'green' : 'black'"
                    @click="changeJobStatusHandler"
                ></unicon>
            </div>
            <div class="job-info-assign">
                Assigned To:
                <select v-model="assignedUser" @change="assignUser">
                    <option :value="null">No one</option>
                    <option
                        :value="user.info._id"
                        v-for="user in getUsersThatCanTakeJobs"
                        :key="user.info._id"
                    >
                        {{ fetchName(user.info) }}
                    </option>
                </select>
            </div>
            <div class="job-info-date flex-row">
                <span :style="{ marginRight: '0.6rem' }">Finish Date: </span>
                <Datepicker
                    v-model="dueDate"
                    @selected="changeDueDate"
                    :monday-first="datePickerConfig.mondayFirst"
                    :disabled-dates="datePickerConfig.disabledDates"
                />
            </div>
            <div class="job-info-description flex-col">
                <span>Description:</span>
                <textarea
                    cols="20"
                    rows="4"
                    spellcheck="false"
                    v-model="description"
                    :placeholder="
                        description
                            ? description
                            : 'This job does not have a description yet. Write description and press enter to save it!'
                    "
                    @keydown.ctrl.enter="changeInfo"
                >
                </textarea>
            </div>
            <div class="job-info-comment flex-col">
                <div class="comment-header flex-row" @click="isCommentsOpen = !isCommentsOpen">
                    <span>Comments:</span>
                    <unicon :name="isCommentsOpen ? 'angle-down' : 'angle-up'" />
                </div>
                <div v-if="isCommentsOpen">
                    <CreateComment :jobId="jobInfo._id" @commentCreated="createCommentHandler" />
                    <Comment
                        v-for="comment in jobInfo.comments"
                        :key="comment._id"
                        :comment="comment"
                        @commentRemoved="removeComment"
                    />
                </div>
            </div>
            <div class="job-info-subJob flex-col">
                <div class="subJob-header flex-row" @click="isSubJobsOpen = !isSubJobsOpen">
                    <span>Sub Jobs:</span>
                    <div class="flex-row">
                        <span>{{ getFinishedJobCount +' / ' + subJobCounts }}</span>
                        <unicon :name="isSubJobsOpen ? 'angle-down' : 'angle-up'" />
                    </div>
                </div>
                <div v-if="isSubJobsOpen">
                    <CreateSubJob :jobId="jobInfo._id" @subJobCreated="createSubJobHandler" />
                    <Subjobs :subJobs="jobInfo.subWorks" @subJobRemoved="subJobRemoveHandler"/>
                </div>
            </div>
        </div>
        <div v-else>Loading...</div>
    </modal>
</template>

<script>
import {
    getJobInfo,
    changeJobStatus,
    changeJobAssigned,
    setDueDate,
    changeJobInfo
} from '@/services/Job.js';
import { mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import Comment from '@/components/Comment/JobComment.vue';
import CreateComment from '@/components/Comment/CreateComment.vue';
import CreateSubJob from '@/components/SubJob/CreateSubJob.vue';
import Subjobs from '@/components/SubJob/SubJobs.vue';

export default {
    components: {
        Datepicker,
        Comment,
        CreateComment,
        CreateSubJob,
        Subjobs
    },
    data() {
        return {
            jobInfo: null,
            assignedUser: null,
            dueDate: null,
            description: null,
            rename: {
                isOpen: false,
                newName: null
            },
            datePickerConfig: {
                disabledDates: {
                    to: new Date(Date.now() - 1000 * 60 * 60 * 24)
                },
                mondayFirst: true
            },
            isCommentsOpen: false,
            isSubJobsOpen: false
        };
    },
    methods: {
        closeModal() {
            this.$modal.hide('jobModal');
        },
        async beforeOpen(event) {
            const jobInfo = await getJobInfo(event.params.jobId);
            console.log(jobInfo);
            this.rename.isOpen = false;
            this.jobInfo = jobInfo;
            this.assignedUser = jobInfo.assignedId;
            this.dueDate = jobInfo.dueDate;
            this.description = jobInfo.description;
        },
        parseInfo(info) {
            return info ? info : 'Empty';
        },
        fetchName(info) {
            return `${info.name} ${info.surname}`;
        },
        async changeJobStatusHandler() {
            const newStatus = await changeJobStatus(this.jobInfo._id, !this.jobInfo.isFinished);
            this.jobInfo['isFinished'] = newStatus.isFinished;
            this.$store.commit('changeJobStatusMutation', {
                jobId: this.jobInfo._id,
                status: newStatus.isFinished,
                stageId: this.jobInfo.stageId
            });
        },
        async assignUser(e) {
            const value = e.target.value;
            await changeJobAssigned(this.jobInfo._id, value.length === 0 ? null : value);
        },
        async changeDueDate(e) {
            const date = new Date(e).toISOString();
            await setDueDate(this.jobInfo._id, date);
        },
        async changeInfo() {
            const response = await changeJobInfo({
                name: this.rename.newName ? this.rename.newName : this.jobInfo.name,
                jobId: this.jobInfo._id,
                description: this.description ? this.description : this.jobInfo.description
            });
            this.jobInfo.name = response.name;
            this.rename.isOpen = false;
            this.rename.newName = null;
            this.$store.commit('changeJobInfoMutation', {
                ...response,
                stageId: this.jobInfo.stageId
            });
        },
        removeComment(commentId) {
            this.jobInfo.comments = this.jobInfo.comments.filter(
                (comment) => comment._id !== commentId
            );
        },
        createCommentHandler(commentInfo) {
            this.jobInfo.comments.push(commentInfo);
        },
        createSubJobHandler(subJobInfo) {
            this.jobInfo.subWorks.push(subJobInfo);
        },
        subJobRemoveHandler(subJobId) {
            this.jobInfo.subWorks = this.jobInfo.subWorks.filter((subJob) => subJob._id !== subJobId);
        }
    },
    computed: {
        ...mapGetters(['getUsersThatCanTakeJobs']),
        subJobCounts() {
            return this.jobInfo.subWorks.length;
        },
        getFinishedJobCount() {
            return this.jobInfo.subWorks.filter((subWork) => subWork.isFinished === true).length;
        }
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

    &-description {
        margin: 0.4rem 0;
    }

    &-assign {
        margin: 0.4rem 0;
        select {
            width: 25%;
            padding: 0.3rem 0.1rem;
            font-size: 0.87rem;
            border-radius: 0.6rem;
            background-color: white;
        }
    }

    &-description {
        textarea {
            margin-top: 0.3rem;
            box-sizing: border-box;
            font-size: 0.97rem;
            border-color: lightgrey;
            padding: 0.4rem;
        }
    }

    &-comment {
        .comment-header {
            border-bottom: 1px solid black;
            align-items: center;
            width: 100%;
            justify-content: space-between;
            padding-right: 0.5rem;
            margin-bottom: 0.3rem;
            cursor: pointer;
        }
    }

    &-subJob {
        .subJob-header {
            border-bottom: 1px solid black;
            align-items: center;
            width: 100%;
            justify-content: space-between;
            padding-right: 0.5rem;
            margin-bottom: 0.3rem;
            cursor: pointer;

            div {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
