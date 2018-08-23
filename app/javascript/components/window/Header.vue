<template>
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item" v-on:click=activeRegistration>
                新規登録
            </div>
            <div v-on:click="activeLogin" v-if="this.$store.state.user.user.id === null" class="navbar-item">
                ログイン
            </div>
            <div v-else v-on:click="logout" class="navbar-item">
                ログアウト
            </div>
        </div>
        <Registration v-bind:is-active="registrationIsActive" v-on:inactive-regist="inactiveRegistration"/>
        <Login v-bind:is-active="loginIsActive" v-on:inactive-login="inactiveLogin"/>
    </nav>
</template>

<script>
    import Registration from '../Modal/Registration';
    import Login from '../Modal/Login'

    export default {
        components: {Login, Registration},
        comments: [
            Registration, Login
        ],
        name: "Header",
        data() {
            return {
                registrationIsActive: false,
                loginIsActive: false
            }
        },
        methods: {
            activeRegistration: function () {
                this.registrationIsActive = true;
            },
            inactiveRegistration: function () {
                this.registrationIsActive = false;
            },
            activeLogin: function () {
                this.loginIsActive = true;
            },
            inactiveLogin: function () {
                this.loginIsActive = false;
            },
            logout: function () {
                this.$store.dispatch('user/logout');
                // 初期画面に戻る
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar-item {
        cursor: pointer;
        &:hover {
            background: white;
            color: #2E2F30 !important;
            transition: .2s ease-out;
        }
    }
</style>