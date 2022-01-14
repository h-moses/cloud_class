<template>
  <div id="dynamic-item">
    <div class="dynamic-head">
      <div class="dynamic-avatar f-fl">
<!--        用户头像-->
        <v-avatar left size="48">
          <v-img :src="source.user.avatar" :lazy-src="this.lazySrc" />
        </v-avatar>
      </div>
      <div class="dynamic-publisher f-fl ml-4">
<!--        用户昵称-->
        <div class="text-subtitle-2 font-weight-bold">
          {{source.user.nick_name}}
        </div>
        <div class="text-caption grey--text">
          2022-01-12
        </div>
      </div>
      <div class="attention-btn f-fr">
        <v-btn outlined rounded color="orange">关注</v-btn>
      </div>
    </div>
    <div class="dynamic_body">
<!--      动态内容-->
      <div class="body-text">
        {{source.content}}
      </div>
      <div class="body-img">
        <v-row>
<!--          动态图片-->
          <viewer ref="viewer" :options="options" :images="source.imgs" class="viewer flex-grow-1" @inited="inited">
            <v-col class="d-inline-block px-1" cols="3" v-for="src in source.imgs" :key="src">
              <img :src="src" style="width: 130px; height: 116px;" />
            </v-col>
          </viewer>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import {mapState} from 'vuex'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'


Vue.use(VueViewer)

export default {
  name: "DynamicItemComponent",
  props: {
    source: {
      type: Object,
      required:true
    }
  },
  data() {
    return {
      options: {
        inline: false,
        button: true, // 是否有按钮
        navbar: true,
        title: false,
        toolbar: true, // 工具栏
        tooltip: true,
        movable: true, // 可移动
        zoomable: true, // 可缩放
        rotatable: true, // 可旋转
        scalable: true,
        transition: true,
        fullscreen: true, // 可全屏
      },
    }
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer
    },
  },
  computed: {
    ...mapState([
        "lazySrc"
    ])
  }
}
</script>

<style lang="scss" scoped>
#dynamic-item {
  width: 700px;
  padding: 24px;
  overflow: hidden; // 高度塌陷
  background-color: white;
}
.f-fl {
  float: left;
}

.f-fr {
  float: right;
}

// 按钮文字颜色
::v-deep .v-btn__content {
  color: orange;
}

.dynamic-head {
  height: 50px;
}

.body-text, .body-img {
  padding: 0 64px;
}


.body-img {
  margin-top: 24px;
}

</style>