<template>
    <div class="members-div">
        <div class="members-div-header">
            <span> Projedeki Üyeler </span>
        </div>
        <div class="members">
            <b v-for="member in members" :key="member.info.id" class="members-container">
                <div>
                    <div class="firstsDiv screen-center">
                        {{ getNameFirsts(member.info.name, member.info.surname) }}
                    </div>
                    {{ getName(member.info.name, member.info.surname) }}
                </div>
                <unicon
                    name="user-times"
                    fill="lightsalmon"
                    class="remove-icon"
                    width="20"
                    @click="removeUser(member.info._id)"
                    v-if="$store.state.userData.isAdmin"
                />
            </b>
            <span v-if="removeUserError !== null" class="removeErrorText">
                {{ removeUserError }}
            </span>
        </div>
        <div class="add-member flex-col" v-if="$store.state.userData.isAdmin">
            <input type="email" placeholder="Kullanıcı maili" v-model="emailOfMember" />
            <span v-if="$store.state.openProject.membersErrorText !== null">
                {{ $store.state.openProject.membersErrorText }}
            </span>
            <button @click="addUser">Üye ekle</button>
        </div>
        <div class="delete-project" v-if="$store.state.userData.isAdmin">
            <button @click="deleteProject" class="delete-project-button">Projeyi sil</button>
        </div>
        <v-dialog />
    </div>
</template>

<script>
import { deleteProject } from '@/services/Projects.js';

export default {
    data() {
        return {
            emailOfMember: null,
            removeUserError: null
        };
    },
    props: {
        members: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        getName(name, surname) {
            return `${name} ${surname}`;
        },
        getNameFirsts(name, surname) {
            const first = name.charAt(0);
            const second = surname.charAt(0);
            return `${first}${second}`;
        },
        addUser() {
            const doesUserInProject = this.checkUserinProject(this.emailOfMember);
            if (!doesUserInProject) {
                this.removeUserError = null;
                this.$store.commit('setAddUserErrorText', null);
                if (!this.validateEmail(this.emailOfMember)) {
                    return this.$store.commit(
                        'setAddUserErrorText',
                        'You have to enter mail address'
                    );
                }
                this.$store.dispatch('addUserToProjectAction', this.emailOfMember);
                this.emailOfMember = null;
            }
        },
        checkUserinProject(mail) {
            const isUserInProject = this.$store.state.openProject.members.filter(
                (member) => member.info.email === mail
            );
            return isUserInProject.length !== 0;
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        removeUser(userId) {
            this.removeUserError = null;
            const isUserAdmin = this.$store.state.openProject.members.find(
                (member) => member.info._id === userId
            ).isAdmin;
            if (userId !== this.$store.state.userData.userId || !isUserAdmin) {
                return this.$store.dispatch('removeUserFromProjectAction', userId);
            } else {
                this.removeUserError = 'Bu kullanıcıyı silemezsiniz!';
            }
        },
        deleteProject() {
            this.$modal.show('dialog', {
                title: 'Projeyi silmek istediğinizden emin misiniz?',
                text: 'Bu proje geri döndürülemez şekilde silinecektir.',
                buttons: [
                    {
                        title: 'İptal',
                        handler: () => {
                            this.$modal.hide('dialog');
                        }
                    },
                    {
                        title: 'Sil',
                        class: 'delete-project-button',
                        handler: async () => {
                            const response = await deleteProject(
                                this.$store.state.openProject.projectDetail._id
                            );
                            if (response.status === 200) {
                                this.$modal.hide('dialog');
                                this.$store.commit('removeProject', response.data.projectId);
                                this.$router.push('/');
                            }
                        }
                    }
                ]
            });
        }
    }
};
</script>

<style lang="scss">
.members-div {
    padding: 2rem;
    width: 20%;
    height: 100vmin;
    border-right: 1px solid lightgray;

    &-header {
        width: 100%;
        border-bottom: 2px solid black;
        span {
            font-size: 1.1rem;
            font-weight: 700;
        }
    }

    .members {
        display: flex;
        flex-flow: column;
        &-container {
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: space-between;
            width: 90%;
            border: 1px solid lightgray;
            margin-top: 1rem;
            padding: 0.7rem;

            div {
                display: flex;
                flex-flow: row;
                align-items: center;
            }

            .firstsDiv {
                background: lightblue;
                color: white;
                border-radius: 50%;
                width: 1.7rem;
                height: 1.7rem;
                font-weight: 500;
                font-size: 0.8rem;
                margin-right: 0.5rem;
            }

            .remove-icon {
                cursor: pointer;
            }
        }

        .removeErrorText {
            margin-top: 1rem;
        }
    }

    .add-member {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 2px solid black;

        input {
            padding: 0.3rem;
            margin-bottom: 0.7rem;
        }

        span {
            font-size: 0.8rem;
            color: rgb(226, 61, 61);
        }

        button {
            border: rgb(207, 247, 148);
            padding: 0.3rem;
            background-color: rgb(207, 247, 148);
            font-size: 0.8rem;
            cursor: pointer;
        }
    }

    .delete-project {
        position: fixed;
        bottom: 0;
        width: 20%;
        margin: 0 -2rem;

        &-button {
            width: 100%;
            font-size: 0.8rem;
            border: none;
            background: lightsalmon;
            padding: 0.4rem 0;
            font-weight: 600;
            cursor: pointer;
        }
    }
}
</style>
