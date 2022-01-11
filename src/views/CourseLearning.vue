<template>
    <v-main id="learn-container">
      <div class="learnPage-wrapper">
        <div class="g-sd1">
          <div class="learn-left">
            <div class="top f-pr">
              <v-img width="230" min-height="130" :src="this.courseInfo.cover" lazy-src="https://nos.netease.com/edu-image/eeb7db8201f7472aa407b49c4f55ccb8.jpg" />
            </div>
            <div class="courseTabList">
              <v-card width="230">
                <v-navigation-drawer permanent>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title style="font-weight: bold; color: #343d42; font-size: 1.17em;">
                        {{this.courseInfo.name}}
                      </v-list-item-title>
                      <v-list-item-subtitle style="color: #00CC7E; font-size: 0.83em">
                        {{this.courseInfo.instructor}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list dense nav >
                    <v-list-item class="u-greentab j-tabitem" v-for="item in items" :key="item.title" :to="jumpChild(item.content)" color="#FFF" active-class="u-curtab" link>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-navigation-drawer>
              </v-card>
            </div>
          </div>
        </div>
        <div class="g-mn1">
          <div class="g-mn1c">
            <div class="m-learnbox">
              <router-view />
            </div>
          </div>
        </div>
      </div>
      <v-dialog v-model="comment_dialog" persistent>
        <v-card width="700" height="400">
          <v-card-title class="text-h5">课程评价</v-card-title>
          <v-divider />
          <div class="text-subtitle-2 font-weight-medium d-flex justify-center mt-4">学了这么久，不如来评价一下这个课程吧~~</div>
          <v-rating
              class="comment-rating my-4 text-center"
              v-model="mark"
              background-color="warning lighten-1"
              color="warning"
              hover
              length="5"
              size="32"
          ></v-rating>
          <v-card-text>
            <div class="course-comment">
              <v-textarea
                  rows="3"
                  row-height="50"
                  outlined
                  name="input-7-4"
                  label="评价内容"
                  placeholder="快来评价一下吧"
                  v-model="comment_content"
              ></v-textarea>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" width="100" @click="submitComment">提交</v-btn>
            <v-btn color="orange" width="100" @click="comment_dialog = false">暂不评价</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
          :timeout="3"
          :value="snack_bar"
          absolute
          bottom
          color="success"
          outlined
          right
      >
        {{snack_notice}}
      </v-snackbar>
    </v-main>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: "CourseLearning",
  data() {
    return {
      items: [
        {title: '公告', content: 'announce'},
        {title: '课件', content: 'content'},
        {title: '测验', content: 'testlist'}
      ],
      courseInfo: {
        id: null,
        name: null,
        cover: null,
        instructor: null
      },
      courseId: 0,
      selectedItem: 1,
      comment_dialog: true,
      mark: 0,
      comment_content: "",
      snack_bar: false,
      snack_notice: ''
    }
  },
  created() {
    this.courseId = this.$route.query.cid
    this.getCourseInfo()
  },
  methods: {
    async getCourseInfo() {
      const {data: res} = await this.$axios.post('course/getCourseBriefInfo',{'id': this.courseId})
      if (res.status === 200) {
        this.courseInfo.id = res.data.cid
        this.courseInfo.name = res.data.title
        this.courseInfo.cover = res.data.cover
        this.courseInfo.instructor= res.data.user.nick_name
      }
    },
    jumpChild(path) {
      return {path: `${path}`, query: {'cid': this.courseId}}
    },
    async submitComment() {
      this.mark *= 2
      console.log(this.comment_content)
      const {data: res} = await this.$axios.post('course/addCourseEvaluation',{'user_id': this.uid,'course_id':this.courseId,'total_star':this.mark,'content':this.comment_content},{
        'type':'json'
      })
      if (res.status === 500) {
        this.snack_notice = res.msg
      } else {
        this.snack_notice = '评价成功'
      }
      this.snack_bar = true
      this.comment_dialog = false
    }
  },
  computed: {
    ...mapGetters([
        "uid"
    ])
  }
}
</script>

<style lang="scss" scoped>
#learn-container {
  background-color: #F5F5F5;
  height: 100%;
}

.f-pr {
  position: relative;
}

.g-sd1 {
  position: relative;
  float: left;
  width: 240px;
  margin-right: -240px;

  .learn-left {
    padding: 20px 0;

    .top {
      padding-left: 10px;
    }

    .courseTabList {
      width: 230px;
      padding: 0;
      margin: 10px;

      .u-greentab {
        font-size: 16px;
      }

      .j-tabitem {
        height: 50px;
        line-height: 50px;
      }

      .u-curtab {
        background-color: #00CC7E;
      }
    }
  }
}

.g-mn1 {
  float: right;
  width: 100%;

  .g-mn1c {
    margin-left: 245px;

    .m-learnbox {
      background-color: #FFF;
      padding: 32px;
      margin: 20px;
    }
  }
}

// 评论对话框按钮的文字颜色
::v-deep .v-btn__content {
  color: white;

  &:hover {
    color: white !important;
  }
}

</style>