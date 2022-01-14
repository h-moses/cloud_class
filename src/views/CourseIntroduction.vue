<template>
    <v-main>
      <div id="course-introduction">
        <div class="m-top">
          <div class="image-intro">
            <v-img :aspect-ratio="16/9" :width="width" :src="courseInfo.cover" />
          </div>
          <div class="course-enroll-info-wrapper">
            <div class="course-title-wrapper">
              <span class="course-title">{{courseInfo.title}}</span>
            </div>
<!--            加入学习按钮-->
            <div class="course-enroll">
<!--              根据状态进行不同处理-->
              <v-btn rounded @click="enterOrInvolve">
                <span v-if="!isInvolved">立即参加</span>
                <span v-else>已参加，进入学习</span>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="horizontal-divider-20" />
        <div class="m-main">
          <div class="m-information f1">
<!--            标签头-->
            <v-tabs class="m-information-tabs" v-model="information_tab" fixed-tabs color="success">
              <v-tabs-slider color="#00c758"></v-tabs-slider>
              <v-tab v-for="item in information_tabs" :key="item">{{item}}</v-tab>
            </v-tabs>
<!--            标签页-->
            <v-tabs-items v-model="information_tab">
<!--              课程介绍页面-->
              <v-tab-item>
                <template #default>
                  <div class="category-title">
                    <v-icon class="iconfont icon-zonghexiaoqingpeizhi-01" left />
                    <span class="f-vam">课程描述</span>
                  </div>
                  <div class="category-content">
                    <v-card-text style="font-size:13px;font-family:SimSun">{{courseInfo.desc}}</v-card-text>
                  </div>
                  <div class="category-title">
                    <v-icon class="iconfont icon-Open-Bookmark" left />
                    <span class="f-vam">课程大纲</span>
                  </div>
                  <div class="category-content">
                    <v-treeview :items="courseCatalogue" open-all></v-treeview>
                  </div>
                </template>
              </v-tab-item>
<!--              评价模块-->
              <v-tab-item>
                <template #default>
                  <div class="comment-section">
                    <div class="comment-course-comment">
                      <div class="comment-course-comment_head">
<!--                        总评价分数-->
                        <div class="comment-course-comment_head_rating-scores">
                          <span>{{commentScore}}</span>
                        </div>
                        <div class="comment-course-comment_head_rating-action">
                          <div class="comment-course-comment_head_rating-action_rate">
<!--                            总评价星级-->
                            <v-rating
                                background-color="red lighten-2"
                                color="red"
                                half-increments
                                readonly
                                length="5"
                                size="28"
                                :value="commentTotalStar"
                            ></v-rating>
                          </div>
<!--                          评价条数-->
                          <div class="comment-course-comment_head_rating-action_tips">
                            <span>共{{commentCount}}条评价</span>
                          </div>
                        </div>
                      </div>
                      <div class="comment-course-comment_comment-list">
<!--                        每一个评价-->
                        <div class="comment-course-comment_comment-list_item" v-for="item in courseComment" :key="item.id">
<!--                          用户头像-->
                          <v-avatar class="f-f2" size="56">
                            <img :src="item.user.avatar">
                          </v-avatar>
                          <div class="comment-course-comment_comment-list_item_body f-f2">
                            <div class="comment-course-comment_comment-list_item_body_user-info">
<!--                              用户昵称-->
                              <span class="comment-course-comment_comment-list_item_body_user-info_name text-body-1">{{item.user.nick_name}}</span>
                              <span>
<!--                                评级星级-->
                                <v-rating
                                    background-color="red lighten-2"
                                    color="red"
                                    half-increments
                                    readonly
                                    length="5"
                                    size="15"
                                    :value="item.total_star / 2"
                                ></v-rating>
                              </span>
                            </div>
<!--                            评级内容-->
                            <div class="comment-course-comment_comment-list_item_body_content">
                              <span>{{item.content}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </v-tab-item>
            </v-tabs-items>
          </div>
          <div class="m-sdinfo">
            <div class="m-teachers_teacher-list">
              <div class="t-title">
                <v-icon class="iconfont icon-jiangshixinxi" left />
                <span>授课老师</span>
              </div>
              <div class="m-teachers_teacher-list_wrap">
                <div class="m-teachers_teacher-item">
<!--                  老师头像-->
                  <v-avatar size="56">
                    <img :src="courseInfo.user.avatar" />
                  </v-avatar>
<!--                  老师昵称-->
                  <div class="cnt">
                    <h3>{{courseInfo.user.nick_name}}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="recommend-bottom f1">
            <div class="um-recommend">
              <div class="um-recommend-title">
                <v-icon class="iconfont icon-shuxian" left />
                <h3>为你推荐</h3>
              </div>
              <div class="um-recommend-list">
                <div class="um-recommend-list_item" v-for="item in items" :key="item.id">
                  <v-img class="um-recommend-list_item_img" :aspect-ratio="16/9" width="200px" :src="courseInfo.cover" />
                  <div class="um-recommend-list_item_name text-h6">数电不挂科-4小时学完数字电子技术基础/数字电路</div>
                  <div class="um-recommend-list_item_teacher text-caption grey--text">猴博士</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-snackbar
          v-model="snack_bar"
          absolute
          bottom
          color="success"
          outlined
      >
        {{snack_notice}}
      </v-snackbar>
    </v-main>
</template>

<script>

import {mapState, mapGetters} from 'vuex'

export default {
  name: "CourseIntroduction",
  data() {
    return {
      width: '510px',
      // 是否已参加该课程
      isInvolved: false,
      // 显示的标签页
      information_tab: null,
      // 标签选项
      information_tabs: [
          '课程详情',
          '课程评价'
      ],
      // 推荐课程
      items: [0,1,2,3,4],
      // 课程信息
      courseInfo: {
        title: '',
        desc: '',
        cover: '',
        user: {
          nick_name: '',
          avatar: '',
        }
      },
      // 课程评价数组
      courseComment: [],
      // 评价条数
      commentCount: 0,
      // 评级总星级
      commentTotalStar: 0,
      // 评价总分
      commentScore: 0,
      // 课程id
      courseId: 0,
      // 是否显示提示消息
      snack_bar: false,
      // 提示消息
      snack_notice: ''
    }
  },
  created() {
    this.courseId = this.$route.query.cid
    this.getCourseInfo(this.courseId)
    this.getCourseComment(this.courseId)
    this.queryIsInvolved()
    // 获取课程目录结构
    this.$store.dispatch('getCatalogue',{'cid': this.courseId})
  },
  methods: {
    // 已登录且已参加处理
    pushLearning() {
      this.$router.push({path: '/learn', query: {'cid': String(this.courseId)}})
    },
    // 查询用户已登录状态下是否参加该课程
    async queryIsInvolved() {
      const {data: res} = await this.$axios.post('course/getUserCourseRelation',{'uid': this.uid,'cid':this.courseId})
      if (res.status === 200) { // 用户已参加
        this.isInvolved = res.data.flag
      } else { // 用户未参加
        this.isInvolved = false
      }
    },
    // 用户未登录或未参加处理
    async participateCourse() {
      if (this.isLogin) { // 已登录状态下
        // 可发送请求，用户加入学习
        const {data: res} = await this.$axios.post('course/joinCourse', {'uid': this.uid, 'cid':this.cid})
        if (res.status === 200) {
          this.snack_notice = '加入成功'
          this.snack_bar = true
        }
      } else { // 用户未登录
        // 提示用户先登录
        this.snack_bar = '用户未登录'
        this.snack_bar = true
      }
    },
    // 根据状态选择处理
    enterOrInvolve() {
      if (this.isInvolved) {
        this.pushLearning()
      } else {
        this.participateCourse()
      }
    },
    /*
    * 获取课程信息
    * */
    async getCourseInfo(cid) {
      const {data: res} = await this.$axios.post('course/getCourseBriefInfo', {'id': cid})
      if (res.status === 200) {
        this.courseInfo.title = res.data.title
        this.courseInfo.desc = res.data.des
        this.courseInfo.cover = res.data.cover
        this.courseInfo.user.nick_name = res.data.user.nick_name
        this.courseInfo.user.avatar = res.data.user.avatar
      }
    },
    /*
    * 获取评价
    * */
    async getCourseComment(cid) {
      const reducer = (previous, current) => previous + current.total_star
      const {data: res} = await this.$axios.post("course/getCourseEvaluation?", {'cid': cid})
      if (res.status === 200) {
        this.courseComment = res.data
        this.commentCount = res.data.length
        if (this.commentCount === 0) { // 没有任何评价
          this.commentScore = '暂无评价'
          this.commentTotalStar = 0
        } else { // 存在评价
          // 计算评价总得分
          this.commentScore = (res.data.reduce(reducer, 0) / this.commentCount / 2).toFixed(1)
          // 计算评价总星级，与评分一致
          this.commentTotalStar = this.commentScore
        }
      }
    }
  },
  computed: {
    ...mapState([
        "courseCatalogue",
        "isLogin"
    ]),
    ...mapGetters([
        "uid"
    ])
  },
  watch: {
    uid: {
      deep: true,
      handler() {
        this.queryIsInvolved()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#course-introduction {
  background-color: #F5F5F5;
  height: 100%;
}

.m-top {
  min-height: 398px;
  padding: 55px 200px;
  background-color: white;

  .image-intro {
    float: left;
    position: relative;
  }

  .course-enroll-info-wrapper {
    width: calc(100% - 510px - 30px);
    float: right;
  }

  .course-title {
    color: #333333;
    font-size: 24px;
    font-weight: 600;
  }

  .course-enroll-info_course-info {
    margin-top: 10px;
    padding: 30px 30px;
    background-color: #F8F9FB;
  }

  .course-enroll {

    margin-top: 180px;

    .v-btn {
      background-color: #00CC7E;
      min-width: 192px;
      height: 48px;
      font-weight: bold;
      font-size: 1rem;

      span {
        color: white;
      }
    }
  }
}

.horizontal-divider-20 {
  height: 20px;
}

.m-main {
  margin: 0 200px;

  .f1 {
    margin-right: 315px;
    padding: 0 41px 1px;
    background-color: white;
  }

  ::v-deep .v-treeview-node__children {

    //子元素的字体大小
    .v-treeview-node__label {
      font-size: 16px;

    }
  }

  .m-information {
    // 计算模型宽度，使其撑满，不随子元素宽度变化
    width: calc(100% - 315px);

    // 确保教师模块排列在右边
    float: left;

    .v-tab {
      font-weight: bold;
    }

    .category-title {
      margin-top: 30px;

      .f-vam {
        font-size: 1.05rem;
        font-weight: bold;
        vertical-align: middle;
      }
    }

    .comment-course-comment {
      padding: 46px 0 60px;

      .comment-course-comment_head {
        overflow: hidden;
        margin-bottom: 14px;

        .comment-course-comment_head_rating-scores, .comment-course-comment_head_rating-action {
          float: left;
        }

        .comment-course-comment_head_rating-scores {
          font-size: 48px;
          width: 73px;
          color: #FF7A3E;
          font-weight: bold;
          margin-right: 15px;
        }

        .comment-course-comment_head_rating-action {
          margin-top: 12px;
        }

        .comment-course-comment_head_rating-action_tips {
          font-size: 13px;
          color: #999999;
          margin-left: 12px;
        }
      }

      .comment-course-comment_comment-list {

        .comment-course-comment_comment-list_item {
          padding-top: 30px;
          //确保每一条用户评论的高度不塌陷
          overflow: hidden;
        }

        .f-f2 {
          // 头像和内容均左浮动
          float: left;
        }

        .comment-course-comment_comment-list_item_body {
          position: relative;
          left: 2%;

          .comment-course-comment_comment-list_item_body_user-info {
            margin-bottom: 9px;

            .comment-course-comment_comment-list_item_body_user-info_name{
              min-height: 31px;
              margin-left: 9px;
              font-size: 14px !important;
            }
          }

          .comment-course-comment_comment-list_item_body_content {
            color: rgb(102, 102, 102);
            font-size: 13px;
            letter-spacing: 1.5px;
            margin-left: 9px;
          }
        }
      }
    }
  }

  .recommend-bottom {
    margin-top: 20px;
    margin-bottom: 50px;
    padding-top: 20px;
    //确保外边距生效
    float: left;

    h3 {
      // 确保可以排列在icon右边
      display: inline-block;
      vertical-align: middle;
    }

    .um-recommend-list_item {

      margin: 20px 0;
      overflow: hidden;

      .um-recommend-list_item_img {
        float: left;
      }

      .um-recommend-list_item_name, .um-recommend-list_item_teacher {
        float: left;
        margin-left: 20px;
      }

      .um-recommend-list_item_teacher {
        margin-top: 20px;
      }
    }
  }

  .m-sdinfo {
    width: 295px;
    margin-left: -295px;
    padding-bottom: 30px;
    background-color: white;
    float: right;

    .t-title {
      margin: 30px 27px;
      font-size: 18px;
    }

    .m-teachers_teacher-list_wrap {
      padding: 0 35px;


      .v-avatar {
        float: left;
      }

      .cnt {
        float: left;
        margin: 10px 0 0 12px;

        h3 {
          font-size: 14px;
          font-weight: 400;
          color: rgb(51, 51, 51);
        }

        .lector-title {
          font-size: 12px;
          color: rgb(153, 153, 153);
          font-weight: 400;
        }
      }
    }
  }
}


</style>