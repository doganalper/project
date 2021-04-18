<template>
    <div class="members-div">
        <div class="members-div-header">
            <span> Members </span>
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
                    fill="red"
                    class="remove-icon"
                    @click="removeUser(member.info._id)"
                />
            </b>
            <span v-if="removeUserError !== null" class="removeErrorText">
                {{ removeUserError }}
            </span>
        </div>
        <div class="add-member flex-col">
            <input type="email" placeholder="User mail" v-model="emailOfMember" />
            <span v-if="$store.state.openProject.membersErrorText !== null">
                {{ $store.state.openProject.membersErrorText }}
            </span>
            <button @click="addUser">Add User</button>
        </div>
    </div>
</template>

<script>
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
            this.removeUserError = null;
            this.$store.commit('setAddUserErrorText', null);
            if (!this.validateEmail(this.emailOfMember)) {
                return this.$store.commit('setAddUserErrorText', 'You have to enter mail address');
            }
            this.$store.dispatch('addUserToProjectAction', this.emailOfMember);
            this.emailOfMember = null;
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
                this.removeUserError = "You can't delete this user!";
            }
        }
    }
};
</script>

<style lang="scss">
.members-div {
    padding: 2rem;
    width: 25%;
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
}
</style>
