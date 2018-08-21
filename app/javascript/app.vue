<template>
    <div id="app">
        <Header/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
    import Header from './components/window/Header.vue';
    import Footer from './components/window/Footer.vue';

    export default {
        components: {
            Header,
            Footer,
        },
    }
</script>

<style lang="scss">
    @import "~bulma";
</style>