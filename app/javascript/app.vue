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