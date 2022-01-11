<template>
  <v-app>
<!--    应用栏-->
    <v-app-bar app elevation="1" style="background-color: white">
      <router-link :to="{path: '/'}">
        <v-img
            id="mooc-logo"
            alt="Mooc Logo"
            class="d-inline-block shrink mr-2"
            contain
            src="https://edu-image.nosdn.127.net/3310f128e53b406f94400f7ae6046db2.png?imageView&quality=100"
            transition="scale-transition"
            width="40"/>
      </router-link>
      <div>
        <v-btn text plain left @click="enterCommunity">社区云</v-btn>
        <v-btn text plain v-show="!isLogin" @click="openDialog">登录 | 注册</v-btn>
        <v-btn text plain left v-show="isLogin" @click="enterCenter">个人中心</v-btn>
        <v-avatar size="32" v-show="isLogin">
          <v-img :src="this.userAvatar" />
        </v-avatar>
      </div>
    </v-app-bar>
    <router-view />
<!--    页脚-->
    <v-footer padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 black--text text-center">
          {{ new Date().getFullYear() }} — <strong>Moses</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <!--        登陆注册对话框-->
    <login-dialog-component :overlay="overlay" @updateOverlay="overlay = $event" />
  </v-app>
</template>

<script>

import LoginDialogComponent from "./components/LoginDialogComponent";
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {LoginDialogComponent},
  data() {
    return {
      overlay: false,
    }
  },
  methods: {
    openDialog() {
      if (!this.isLogin) {
        this.overlay = true
      }
    },
    enterCommunity() {
      this.$router.push({path: '/community'})
    },
    enterCenter() {
      this.$router.push({path: '/user', query: {'uid': this.uid}})
    }
  },
  computed: {
    ...mapState([
        "isLogin"
    ]),
    ...mapGetters([
        "uid",
        "userName",
        "userAvatar"
    ]),
  }
};
</script>

<style lang="scss" scoped>
html,body {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

::v-deep .v-toolbar__content, .v-toolbar__extension {
  justify-content: space-around;
}

#mooc-logo {
  min-width: 250px;
  max-width: 250px;
  max-height: 60%;
}

::v-deep .v-btn__content {
  color: black;
  &:hover {
    color: #00c758;
  }
}
</style>
