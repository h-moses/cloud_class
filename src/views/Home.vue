<template>
  <v-app-bar app>
    <v-img
        id="mooc-logo"
        alt="Mooc Logo"
        class="d-inline-block shrink mr-2"
        contain
        src="https://edu-image.nosdn.127.net/3310f128e53b406f94400f7ae6046db2.png?imageView&quality=100"
        transition="scale-transition"
        width="40"/>
    <v-btn class="register-login-btn" text>
      <span>登录 | 注册</span>
    </v-btn>
  </v-app-bar>
</template>

<script>

  export default {
    name: 'Home',
  }
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content, .v-toolbar__extension {
  justify-content: space-around;
}
#mooc-logo {
  min-width: 250px;
  max-width: 250px;
  max-height: 60%;
}
.register-login-btn {
  &:hover {
    color: #00c758;
  }
}
</style>