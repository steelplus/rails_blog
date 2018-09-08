<template>
    <div class="modal" :class="{'is-active': isActive}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">新規登録</p>
                <button class="delete" aria-label="close" v-on:click="$emit('inactive-regist')"></button>
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

                <div class="field">
                    <label class="label">パスワード（確認）</label>
                    <div class="control">
                        <input v-model="user.password_confirmation" class="input" type="password"
                               placeholder="パスワード（確認）">
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" v-on:click="registration">新規登録</button>
                <button class="button" v-on:click="$emit('inactive-regist')">キャンセル</button>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Registration",
        props: {
            isActive: false,
        },
        data() {
            return {
                user: {
                    'email': null,
                    'password': null,
                    'password_confirmation': null
                },
                errors: []
            }
        },
        methods: {
            registration: function () {
                try {
                    this.$store.dispatch('user/signUp', {
                        user: this.user,
                    });
                    // モーダルを閉じる
                    this.$emit('inactive-regist');
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

<style scoped lang="scss">
    .is-error-invisible {
        display: none;
    }

    #error-message {
        color: red;
        font-weight: bold;
    }
</style>