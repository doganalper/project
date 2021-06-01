<template>
    <div class="guest-projects flex-col">
        <span class="guest-projects-header">Dahil olduğunuz projeler</span>
        <div class="guest-projects-list flex-col">
            <div
                v-for="project in $store.state.userData.projects"
                :key="project._id"
                class="guest-projects-list-project flex-row"
            >
                <span class="project-name">
                    {{ project.name }}
                </span>
                <div class="project-content flex-row">
                    <button @click="openModal('members', project._id)">Üyeleri Gör</button>
                    <button @click="openModal('guests', project._id)">Misafirleri Gör</button>
                    <button @click="openModal('teams', project._id)">Takımları Gör</button>
                    <button @click="openModal('requests', project._id)">İstekleri Gör</button>
                </div>
            </div>
        </div>
        <MembersModal />
        <GuestsModal />
        <TeamsModal />
        <RequestsModal />
    </div>
</template>

<script>
import MembersModal from '@/components/Guest/MembersModal.vue';
import GuestsModal from '@/components/Guest/GuestsModal.vue';
import TeamsModal from '@/components/Guest/TeamsModal.vue';
import RequestsModal from '@/components/Guest/RequestsModal.vue';

export default {
    components: {
        MembersModal,
        GuestsModal,
        TeamsModal,
        RequestsModal
    },
    methods: {
        openModal(modalType, projectId) {
            switch (modalType) {
                case 'members':
                    this.$modal.show('membersModal', { projectId: projectId });
                    break;
                case 'guests':
                    this.$modal.show('guestsModal', { projectId: projectId });
                    break;
                case 'teams':
                    this.$modal.show('teamsModal', { projectId: projectId });
                    break;
                case 'requests':
                    this.$modal.show('requestsModal', { projectId: projectId });
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="scss">
.guest-projects {
    padding: 5rem;
    &-header {
        font-size: 1.5rem;
        border-bottom: 2px solid lightgray;
        padding-bottom: 0.5rem;
    }
    &-list {
        &-project {
            margin-top: 1rem;

            .project-name {
                font-weight: bold;
                padding: 1rem;
                border: 1px solid lightgray;
                border-right: 1px solid rgb(139, 139, 139);
                width: 15%;
                display: flex;
                align-items: center;
            }

            .project-content {
                padding: 1rem;
                border: 1px solid lightgray;
                width: 85%;
                align-items: center;
                justify-content: space-between;

                button {
                    width: (100% / 4) - 2%;
                    padding: 0.5rem 0;
                    border: none;
                    font-weight: 600;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
