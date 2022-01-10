<template>
  <div id="login-dialog">
    <v-overlay :value="dialog" absolute>
      <v-dialog v-model="dialog" max-width="500" transition="dialog-bottom-transition" persistent>
        <v-card>
          <v-card-title>
            <span class="text-h5">用户登录</span>
          </v-card-title>
          <v-divider class="mb-5" />
          <v-card-text>
            <v-container id="login-container">
              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field v-model="loginForm.phone" label="请输入手机号" required outlined prepend-inner-icon="mdi-cellphone"></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-text-field v-model="loginForm.pwd" label="请输入密码" type="password" required outlined prepend-inner-icon="mdi-lock"></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-btn color="#00CC7E" block @click="login">
                    <span style="color: white">登录</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-overlay>
  </div>
</template>

<script>

export default {
  name: "LoginDialogComponent",
  props: {
    overlay: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loginForm: {
        phone: '',
        pwd: '',
        // 默认为学生
        role: 1
      },
      rules: {
        required: value => !!value || '不能为空',
        phone: value => {
          const pattern = /^1[3-9]\d{9}$/
          return pattern.test(value) || '手机号不合法'
        }
      },
      dialog: false
    }
  },
  methods: {
    login() {
      this.$store.dispatch('loginUser',this.loginForm)
      this.dialog = false
      this.$emit("updateOverlay", this.dialog)
    }
  },
  watch: {
    overlay: {
      deep: true,
      handler(val) {
        this.dialog = val
      }
    }
  }
}
</script>

<style scoped>

</style>