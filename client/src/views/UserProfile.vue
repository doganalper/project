<template>
    <div class="user-profile screen-center">
        <div class="user-profile-frame flex-row">
            <div class="user-profile-frame-left flex-col">
                <span v-if="!userData.profileImage" class="screen-center user-circle">
                    {{ getNameFirsts(userData.name) }}
                </span>
                <img
                    v-else
                    :src="userData.profileImage"
                />
                <input
                    type="file"
                    ref="file"
                    @change="onSelect"
                    accept="image/png, image/jpeg, image/jpg"
                />
                <span>{{ userData.name }}</span>
                <button @click="trigger">Upload Image</button>
            </div>
            <div class="user-profile-frame-right">
                <div class="settings">
                    <input v-model="name" type="text" placeholder="Name" />
                    <input v-model="surname" type="text" placeholder="Surname" />
                    <span @click="openModal">Set Password</span>
                    <button @click="changeUserInfoHandler">Set</button>
                </div>
                <div class="projects">
                    <div 
                        class="project" 
                        v-for="project in userData.projects" 
                        :key="project.id"
                        @click="routeToProject(project.id)"
                    >
                        <div class="picture screen-center">
                            <unicon name="list-ui-alt" fill="black" />
                        </div>
                        {{project.name}}
                    </div>
                </div>
            </div>
        </div>
        <PasswordModal />
    </div>
</template>

<script>
import Axios from '@/utils/Axios.js';
import { fetchUserData, changeUserInfo } from '@/services/User';
import PasswordModal from '@/components/UI/PasswordModal.vue';

export default {
    data() {
        return {
            file: null,
            userData: null,
            name: null,
            surname: null
        };
    },
    components: {
        PasswordModal
    },
    methods: {
        onSelect() {
            const file = this.$refs.file.files[0];
            this.file = file;
            this.sendFile();
        },
        async changeUserInfoHandler() {
            const response = await changeUserInfo({
                name: this.name ? this.name : this.userData.name.split(' ')[0],
                surname: this.surname ? this.surname : this.userData.name.split(' ')[1]
            });
            this.name = null;
            this.surname = null;
            this.userData.name = `${response.user.name} ${response.user.surname}`;
        },
        async sendFile() {
            const formData = new FormData();
            formData.append('profilePic', this.file);
            try {
                const response = await Axios.post('/user/update-profile-picture', formData);
                this.userData.profileImage = await require(`/home/alperdogan/Desktop/projects/project/server/public/${response.data.userImage}`);
            } catch (err) {
                console.log(err);
            }
        },
        async fetchUserInfo() {
            const userData = await fetchUserData();
            console.log(userData);
            this.userData = userData;
            if (this.userData.profileImage) {
                this.userData.profileImage = await require(`/home/alperdogan/Desktop/projects/project/server/public/${this.userData.profileImage}`);
            }
        },
        trigger() {
            this.$refs.file.click();
        },
        getNameFirsts(name) {
            const splittedName = name.split(' ');
            const first = splittedName[0].charAt(0);
            const second = splittedName[1].charAt(0);
            return `${first}${second}`;
        },
        openModal() {
            this.$modal.show('psswdModal');
        },
        routeToProject(projectId) {
            this.$router.push(`/project/${projectId}`);
        }
    },
    mounted() {
        this.fetchUserInfo();
    }
};
</script>

<style lang="scss">
.user-profile {
    min-height: 90vh;

    &-frame {
        border: 1px solid rgb(189, 189, 189);
        box-shadow: 0px 0px 38px -16px rgba(0, 0, 0, 0.5);
        border-radius: 1rem;
        width: 60%;
        padding: 2rem 1.2rem;

        &-left {
            padding: 1rem 0;
            align-items: center;
            width: 35%;

            input {
                visibility: hidden;
            }

            img {
                width: 50%;
                height: 200px;
                border-radius: 50%;
                background-position: 50% 50%;
                background-repeat: no-repeat;
            }

            .user-circle {
                width: 50%;
                height: 150px;
                border-radius: 50%;
                background-color: lightblue;
                font-size: 1.5rem;
                color: white;
            }

            button {
                border: none;
                background-color: white;
                font-size: 1rem;
                color: darkred;

                &:hover {
                    text-decoration: underline;
                    text-decoration-thickness: 0.15rem;
                    text-underline-offset: 0.2rem;
                    cursor: pointer;
                }
            }
        }

        &-right {
            width: 65%;
            border: 1px solid lightgray;

            .settings {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 0.6rem 0.3rem;
                border-bottom: 1px solid lightgrey;

                input {
                    padding: 0.2rem;
                    border: 1px solid lightgray;
                }

                span {
                    font-size: 0.7rem;
                    color: darkred;
                    cursor: pointer;
                }

                button {
                    width: 20%;
                    background-color: greenyellow;
                    border: none;
                    padding: 0.2rem 0;
                    border-radius: 0.5rem;
                    cursor: pointer;
                }
            }

            .projects {
                padding: 0.5rem 1rem;
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;

                .project {
                    text-align: center;
                    cursor: pointer;

                    .picture {
                    border: 1px solid lightgray;
                    width: 6rem;
                    height: 6rem;
                    margin-bottom: 0.5rem;
                    }
                }
            }
        }
    }
}
</style>
