<template>
  <div class="loginIcoIndex">
    <a-form-model style="width: 300px" :model="form">
      <a-form-model-item>
        <a-input v-model="form.username" placeholder="Username">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.password" type="password" placeholder="Password">
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          @click="handleSubmit"
          :disabled="form.username === '' || form.password === ''"
          v-if="!token"
        >
          {{ token ? '已登录' : '登陆' }}
        </a-button>

        <a-button
          type="danger"
          html-type="button"
          v-else
          @click="$store.commit('SET_TOKEN', '')"
        >
          退出
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'loginIcoIndex',
  data() {
    return {
      form: {
        username: '15166180938',
        password: '1111',
        inputCode: '111',
      },
    }
  },
  computed: {
    ...mapState(['token']),
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit() {
      this.Login(this.form)
    },
  },
}
</script>

<style lang="less">
.loginIcoIndex {
}
</style>
