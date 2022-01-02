<template>
  <div id="video-container">
    <div class="u-learn-moduletitle">
      <router-link :to="{path: '/learn/content',query: {'cid': 1}}">
        <span class="text-body-1 f-f1 f-fc3">课件</span>
      </router-link>
      <v-icon class="f-f1" left right>mdi-chevron-right</v-icon>
      <v-select class="chapter-selector f-f1" dense :items="chapterItems" v-model="selectedChapter"></v-select>
      <v-icon class="f-f1" left right>mdi-chevron-right</v-icon>
      <v-select class="section-selector f-f1" dense :items="this.$store.getters.sectionItems(this.selectedChapter)" v-model="selectedSection"></v-select>
    </div>
    <div class="player-container flex justify-center">
<!--      vjs-big-play-centered可使大的播放按钮居住，vjs-fluid可使视频占满容器 -->
      <video id="video-player" class="video-js vjs-big-play-centered vjs-fluid" ref="videoPlayer"></video>
    </div>
  </div>
</template>

<script>

export default {
  name: "VideoComponent",
  data() {
    return {
      player: null,
      videoSrc: 'http://r46uv4d69.hn-bkt.clouddn.com/2004727%E2%80%94%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC%E9%98%9F%E2%80%94%E3%80%90A14%E3%80%91%E7%A7%BB%E5%8A%A8%E4%BA%92%E8%81%94%E6%97%B6%E4%BB%A3%E7%9A%84%E8%AE%BE%E5%A4%87%E7%AE%A1%E7%90%86%E3%80%90%E8%99%B9%E8%BD%AF%E3%80%91%E2%80%94%E9%A1%B9%E7%9B%AE%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91.mp4',
      selectedChapter: '',
      selectedSection: '',
    }
  },
  created() {
    this.selectedChapter = this.$store.getters.selectedChapter(this.$route.query.sname)
    this.selectedSection = this.$route.query.sname
  },
  mounted() {
    this.setupVideoPlayer()
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    setupVideoPlayer() {
      let options = {
        controls: true, // 是否显示底部控制栏
        preload: 'auto',
        autoplay: true,
        width: '600',
        height: '300',
        loop: false,
        controlBar: {
          // 自定义按钮的位置
          children: [
            {
              name: "playToggle" // 播放按钮
            },
            {
              name: "progressControl" // 播放进度条
            },
            {
              name: "currentTimeDisplay" // 当前已播放时间
            },
            {
              name: "timeDivider"
            },
            {
              name: "durationDisplay" // 总时间
            },
            { // 倍数播放
              name: 'playbackRateMenuButton',
              'playbackRates': [0.5, 1, 1.5, 2, 2.5]
            },
            {
              name: "volumePanel", // 音量调整方式横线条变为竖线条
              inline: false // 不使用水平方式
            },
            {
              name: "pictureInPictureToggle" //画中画播放模式
            },
            {
              name: "fullscreenToggle" // 全屏
            }
          ]
        },
        sources:[ // 视频源
          {
            src: this.videoSrc,
            type: 'video/mp4',
            poster: '//vjs.zencdn.net/v/oceans.png'
          }
        ]
      };
      this.player = this.$video(this.$refs.videoPlayer,options)
      // 必须为箭头函数，否则无法调用videojs
      this.player.ready(() => {
        this.$video.log('Your player is ready')

        this.player.play()

        this.player.on('ended',function () {
          this.$video.log('Awww... over so soon ?!')
        })
      })
    }
  },
  computed: {
    chapterItems: function () {
      return this.$store.getters.chapterItems
    },
    sectionItems: function (c_name) {
      return this.$store.getters.sectionItems(c_name)
    }
  },
  watch: {
    // 当选择的章发生变化时，其中的节自动调整为该章的第一个视频
    selectedChapter: function (newValue) {
      this.selectedSection = this.$store.getters.sectionItems(newValue)[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.f-f1 {
  float: left;
}
.f-fc3 {
  color: #333;

  &:hover {
    color: #00CC7E;
  }
}

.u-learn-moduletitle {
  overflow: hidden;
  padding: 10px 0;
  // 垂直居中
  display: flex;
  align-items: center;

  // 去除下拉框下方所占空间
  ::v-deep .v-text-field__details {
    display: none;
  }
}

</style>