<template>
    <div class="teams-settings flex-col">
        <div class="teams-settings-main flex-row">
            <div class="setting-div flex-col">
                Açıklama
                <textarea
                    cols="20"
                    rows="4"
                    v-model="description"
                    :placeholder="getTeamDescription"
                >
                </textarea>
                <button class="changeDescription" @click="changeDescription">Değiştir</button>
            </div>
            <div class="setting-div flex-col">
                Üye Ekle
                <select v-model="addUserSelect">
                    <option disabled selected="true" :value="null">Kullanıcı Seçiniz!</option>
                    <option
                        :value="{ userId: user.info._id }"
                        v-for="user in usersNotInTeam"
                        :key="user.info._id"
                    >
                        {{ user.info.name }}
                    </option>
                </select>
                <button class="changeDescription" @click="addUser">Üye Ekle</button>
            </div>
            <div class="setting-div flex-col">
                Üye Kaldır
                <select v-model="removeUserSelect">
                    <option disabled selected="true" :value="null">Kullanıcı Seçiniz!</option>
                    <option
                        :value="{ userId: user.info._id }"
                        v-for="user in usersInTeam"
                        :key="user.info._id"
                    >
                        {{ user.info.name }}
                    </option>
                </select>
                <button class="changeDescription" @click="removeUser">Üyeyi Kaldır</button>
            </div>
            <div class="setting-div upload flex-col">
                Takım fotoğrafı değiştir
                <input
                    type="file"
                    ref="file"
                    @change="onSelect"
                    accept="image/png, image/jpeg, image/jpg"
                />
                <button @click="trigger">Fotoğrafı Yükle</button>
            </div>
        </div>
    </div>
</template>

<script>
import { changeTeamDetails } from '@/services/Teams';
import Axios from '@/utils/Axios.js';

export default {
    props: {
        usersNotInTeam: {
            type: Array,
            default: () => []
        },
        usersInTeam: {
            type: Array,
            default: () => []
        },
        teamDescription: {
            type: String
        }
    },
    data() {
        return {
            description: null,
            addUserSelect: null,
            removeUserSelect: null,
            file: null
        };
    },
    methods: {
        async changeDescription() {
            if (this.description) {
                const newDetail = await changeTeamDetails(
                    this.$store.state.openTeam.teamDetail._id,
                    { description: this.description }
                );
                this.$store.commit('changeTeamDetail', newDetail);
                this.description = null;
            }
        },
        addUser() {
            if (this.addUserSelect) {
                this.$store.dispatch('addUserToTeamAction', {
                    teamId: this.$router.currentRoute.params.teamId,
                    userId: this.addUserSelect
                });
            }
            this.addUserSelect = null;
        },
        removeUser() {
            if (this.removeUserSelect) {
                this.$store.dispatch('removeUsersFromTeamAction', {
                    teamId: this.$router.currentRoute.params.teamId,
                    userId: this.removeUserSelect
                });
            }
            this.removeUserSelect = null;
        },
        trigger() {
            this.$refs.file.click();
        },
        onSelect() {
            const file = this.$refs.file.files[0];
            this.file = file;
            this.sendFile();
        },
        async sendFile() {
            const formData = new FormData();
            formData.append('teamPic', this.file);
            console.log(this.file);
            try {
                const response = await Axios.post(
                    `/teams/${this.$router.currentRoute.params.teamId}/changePicture`,
                    formData
                );
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        }
    },
    computed: {
        getTeamDescription() {
            return this.$store.state.openTeam.teamDetail.description
                ? this.$store.state.openTeam.teamDetail.description
                : 'Açıklamayı giriniz!';
        }
    }
};
</script>

<style lang="scss">
.teams-settings {
    border-bottom: 1px solid rgb(199, 199, 199);
    background-color: rgb(243, 243, 243);
    padding: 1.2rem 2rem;

    &-main {
        column-gap: 1%;

        .setting-div {
            width: (100% / 4) - 1%;
            padding-right: 0.5rem;

            .changeDescription {
                padding: 0.3rem 0;
                background-color: lightgreen;
                border: none;
                width: 40%;
                margin: 0 auto;
                margin-top: 0.5rem;
                border-radius: 0.4rem;
            }

            select {
                width: 70%;
                margin: 0 auto;
            }
        }

        .upload {
            input {
                display: none;
            }

            button {
                padding: 0.4rem 0;
                background-color: lightgreen;
                border: none;
                border-radius: 0.4rem;
                cursor: pointer;
            }
        }
    }

    textarea {
        padding: 0.4rem;
        box-sizing: border-box;
    }
}
</style>
