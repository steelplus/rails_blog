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
    import 'babel-polyfill';

    export default {
        components: {
            Header,
        },
        async mounted() {
            // ログインしているかどうかを判定する
            await this.$store.dispatch('user/checkUser');
            if (this.$store.state.user.user.id === null) {
                this.$router.push('/');
            } else {
                this.$router.push('/home');
            }
        },
        methods: {}
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