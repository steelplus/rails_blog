<template>
    <div id="app">
        <Header/>
        <section class="hero is-light page">
            <router-view class="page-content"/>
        </section>
    </div>
</template>

<script>
    import Header from './components/window/Header.vue';

    export default {
        components: {
            Header,
        },
        mounted() {
            // ログインしているかどうかを判定する
            this.$store.dispatch('user/checkUser', {callback: this.checkLoggedIn});
        },
        methods: {
            checkLoggedIn: function (response) {
                if (this.$store.state.user.user.id === null) {
                    this.$router.push('/');
                } else {
                    this.$router.push('/home');
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~bulma";

    .page {
        min-height: 100vh;
        .page-content {
            margin-top: 60px;
        }
    }
</style>