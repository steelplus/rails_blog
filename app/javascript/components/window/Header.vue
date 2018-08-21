<template>
    <nav class="navbar is-link is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item" v-on:click=activeRegistration>
                新規登録
            </div>
            <div class="navbar-item">
                ログイン
            </div>
            <div v-on:click="logout" class="navbar-item">
                ログアウト
            </div>
        </div>
        <Registration v-bind:is-active="registrationIsActive" v-on:inactive-regist="inactiveRegistration"/>
    </nav>
</template>

<script>
    import Registration from '../Modal/Registration'

    export default {
        components: {Registration},
        comments: [
            Registration
        ],
        name: "Header",
        data() {
            return {
                registrationIsActive: false
            }
        },
        methods: {
            activeRegistration: function () {
                this.registrationIsActive = true;
            },
            inactiveRegistration: function () {
                this.registrationIsActive = false;
            },
            logout: function () {
                this.$store.dispatch('user/logout');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar-item {
        cursor: pointer;
    }
</style>