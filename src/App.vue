<template>
  <v-app>
<!--    应用栏-->
    <v-app-bar app elevation="1" style="background-color: white">
<!--      logo链接-->
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
      <div class="d-flex align-center">
<!--        搜索栏-->
        <v-text-field class="course-search" background-color="#eee" placeholder="搜索感兴趣的课程" rounded append-icon="mdi-magnify" v-model="key" @click:append="searchCourse" />
<!--        社区云按钮-->
        <v-btn text plain left @click="enterCommunity">社区云</v-btn>
<!--        登录按钮-->
        <v-btn text plain v-show="!isLogin" @click="openDialog">登录</v-btn>
<!--        个人中心入口，默认不显示-->
        <v-btn text plain left v-show="isLogin" @click="enterCenter">个人中心</v-btn>
<!--        用户头像，默认不显示-->
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
      // 对话框是否打开
      overlay: false,
      // 搜索关键字
      key: ""
    }
  },
  methods: {
    /*
    * 打开对话框
    * */
    openDialog() {
      if (!this.isLogin) {
        this.overlay = true
      }
    },
    /*
    * 导航至社区
    * */
    enterCommunity() {
      this.$router.push({path: '/community'})
    },
    /*
    * 导航至个人中心
    * */
    enterCenter() {
      this.$router.push({path: '/user', query: {'uid': this.uid}})
    },
    /*
    * 导航至搜索页面
    * */
    searchCourse() {
      this.$router.push({path: '/search', query: {'key': this.key}})
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

.course-search {
  float: left;
}

.course-search {
  margin-top: 8px !important;
}

::v-deep .v-text-field__details {
  display: none;
}

//::v-deep .v-input__slot {
//  margin-bottom: 0;
//}
</style>
