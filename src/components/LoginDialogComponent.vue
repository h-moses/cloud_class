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
<!--                  账号输入框-->
                  <v-text-field v-model="loginForm.phone" label="请输入手机号" required outlined prepend-inner-icon="mdi-cellphone"></v-text-field>
                </v-col>
                <v-col cols="10">
<!--                  密码输入框-->
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
      // 是否显示对话框
      dialog: false
    }
  },
  methods: {
    // 登录
    login() {
      this.$store.dispatch('loginUser',this.loginForm)
      // 关闭对话框
      this.dialog = false
      // 父组件的对话框状态保持一致
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