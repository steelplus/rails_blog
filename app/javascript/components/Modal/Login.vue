<template>
    <div class="modal" :class="{'is-active': isActive}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">ログイン</p>
                <button class="delete" aria-label="close" v-on:click="$emit('inactive-login')"></button>
            </header>
            <section class="modal-card-body">
                <!--フォーム-->
                <div :class="{'is-error-invisible': errors.length === 0}">
                    <ul id="error-message">
                        <li v-for="error in errors">
                            {{ error }}
                        </li>
                    </ul>
                </div>
                <div class="field">
                    <label class="label">メールアドレス</label>
                    <div class="control">
                        <input v-model="user.email" class="input" type="text" placeholder="メールアドレス">
                    </div>
                </div>

                <div class="field">
                    <label class="label">パスワード</label>
                    <div class="control">
                        <input v-model="user.password" class="input" type="password" placeholder="パスワード">
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-link" v-on:click="login">ログイン</button>
                <button class="button" v-on:click="$emit('inactive-login')">キャンセル</button>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        props: {
            isActive: false,
        },
        data() {
            return {
                user: {
                    'email': null,
                    'password': null,
                },
                errors: []
            }
        },
        methods: {
            login: function () {
                try {
                    this.$store.dispatch('user/login', {
                        user: this.user,
                    });
                    // モーダルを閉じる
                    this.$emit('inactive-login');
                    // エラーを初期化
                    this.errors = [];
                    // ホームに遷移
                    this.$router.push('/home');
                } catch (e) {
                    this.errors = error.response.data.content.message.error;
                }
            },
        }
    }
</script>

<style scoped>
    .is-error-invisible {
        display: none;
    }

    #error-message {
        color: red;
        font-weight: bold;
    }
</style>