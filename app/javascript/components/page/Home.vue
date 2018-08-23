<template>
    <div class="hero-body">
        <p class="title">
            ようこそ {{this.$store.state.user.user.email}} さん
        </p>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>