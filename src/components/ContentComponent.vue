<template>
  <div id="content-container">
    <div class="u-learn-moduletitle">
      <div class="text-h6">课件</div>
    </div>
    <div class="m-learnChapterNormal">
<!--      树形图-->
      <v-treeview :active.sync="video" :items="catalogue" activatable @update:active="playVideo" return-object hoverable open-on-click>
<!--        视频的图标-->
        <template v-slot:prepend="{item}">
          <v-icon v-if="item.videoUrl" color="#00CC7E">mdi-video</v-icon>
        </template>
      </v-treeview>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentComponent",
  data() {
    return {
      video: [],
    }
  },
  methods: {
    // 导航至视频播放页面
    playVideo() {
      this.$router.push({name: 'VideoComponent', query: {'cid': this.$route.query.cid, 'sname': this.video[0].name}})
    }
  },
  computed: {
    catalogue: function () {
      return this.$store.state.courseCatalogue
    }
  }
}
</script>

<style lang="scss" scoped>
.u-learn-moduletitle {
  padding: 10px 0;
  margin-bottom: 20px;
}

//父节点的背景颜色和外边距
::v-deep .v-treeview-node {
  background: #F7F7F7;
  margin-bottom: 10px;
}

::v-deep .v-treeview-node__children {
  //子元素之间有外边距
  background-color: white;

  .v-treeview-node--leaf {
    //子元素背景色为白色
    background-color: white;
  }

  //子元素的字体大小
  .v-treeview-node__label {
    font-size: 16px;

    &:hover {
      color: #00CC7E;
    }
  }
}
</style>