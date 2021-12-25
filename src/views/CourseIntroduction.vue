<template>
  <v-app>
    <v-app-bar app hide-on-scroll>

    </v-app-bar>
    <v-main>
      <div id="course-introduction">
        <div class="m-top">
          <div class="image-intro">
            <v-img :aspect-ratio="16/9" :width="width" :src="image_src" />
          </div>
          <div class="course-enroll-info-wrapper">
            <div class="course-title-wrapper">
              <span class="course-title">{{course_title}}</span>
            </div>
            <div class="course-enroll">
              <v-btn rounded @click="participateCourse">
                <span v-if="isAttend" @click="participateCourse">立即参加</span>
                <span v-else @click="pushCourse">已参加，进入学习</span>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="horizontal-divider-20" />
        <div class="m-main">
          <div class="m-information f1">
            <v-tabs class="m-information-tabs" v-model="information_tab" fixed-tabs color="success">
              <v-tabs-slider color="#00c758"></v-tabs-slider>
              <v-tab v-for="item in information_tabs" :key="item">{{item}}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="information_tab">
              <v-tab-item>
                <template #default>
                  <div class="category-title">
                    <v-icon class="iconfont icon-zonghexiaoqingpeizhi-01" left />
                    <span class="f-vam">课程描述</span>
                  </div>
                  <div class="category-content">
                    <v-card-text style="font-size:13px;font-family:SimSun">{{text}}</v-card-text>
                  </div>
                  <div class="category-title">
                    <v-icon class="iconfont icon-Open-Bookmark" left />
                    <span class="f-vam">课程大纲</span>
                  </div>
                  <div class="category-content">
                    <v-treeview :items="items" open-all></v-treeview>
                  </div>
                </template>
              </v-tab-item>
              <v-tab-item>
                <template #default>
                  <div class="comment-section">
                    <div class="comment-course-comment">
                      <div class="comment-course-comment_head">
                        <div class="comment-course-comment_head_rating-scores">
                          <span>4.4</span>
                        </div>
                        <div class="comment-course-comment_head_rating-action">
                          <div class="comment-course-comment_head_rating-action_rate">
                            <v-rating
                                background-color="red lighten-2"
                                color="red"
                                half-increments
                                readonly
                                length="5"
                                size="28"
                                value="3"
                            ></v-rating>
                          </div>
                          <div class="comment-course-comment_head_rating-action_tips">
                            <span>共17条评价</span>
                          </div>
                        </div>
                      </div>
                      <div class="comment-course-comment_comment-list">
                        <div class="comment-course-comment_comment-list_item">
                          <v-avatar class="f-f2" size="56">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg">
                          </v-avatar>
                          <div class="comment-course-comment_comment-list_item_body">
                            <div class="comment-course-comment_comment-list_item_body_user-info f-f2">
                              <span class="comment-course-comment_comment-list_item_body_user-info_name text-body-1">相约吃泡面</span>
                              <span>
                                <v-rating
                                    background-color="red lighten-2"
                                    color="red"
                                    half-increments
                                    readonly
                                    length="5"
                                    size="15"
                                    value="3"
                                ></v-rating>
                              </span>
                            </div>
                            <div class="comment-course-comment_comment-list_item_body_content f-f2">
                              <span>{{comment_content}}</span>
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
                <v-icon class="iconfont icon-shuxian" left />
                <span>授课老师</span>
              </div>
              <div class="m-teachers_teacher-list_wrap">
                <div class="m-teachers_teacher-item">
                  <v-avatar size="56">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" />
                  </v-avatar>
                  <div class="cnt">
                    <h3>赵春晖</h3>
                    <p class="lector-title">教授</p>
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
                <div class="um-recommend-list_item" v-for="item in items" :key="item">
                  <v-img class="um-recommend-list_item_img" :aspect-ratio="16/9" width="200px" :src="image_src" />
                  <div class="um-recommend-list_item_name text-h6">数电不挂科-4小时学完数字电子技术基础/数字电路</div>
                  <div class="um-recommend-list_item_teacher text-caption grey--text">猴博士</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "CourseIntroduction",
  data() {
    return {
      image_src: 'https://nos.netease.com/edu-image/eeb7db8201f7472aa407b49c4f55ccb8.jpg?imageView&type=webp',
      course_title: '大数据解析与应用导论',
      width: '510px',
      isAttend: false,
      information_tab: null,
      information_tabs: [
          '课程详情',
          '课程评价'
      ],
      text: '课程以一个Windows下的图形游戏程序入手，借助一个C语言图形库，展开全部的教学内容。\\r\\n\\r\\n作为计算机的基础语言，C语言有许多独特的地方。从1970年代诞生起，它的历史使命就是编写系统程序，它被设计成非常贴近底层、贴近硬件。它的很多独特的设计都是为了能够准确地反映硬件操作。但是历史又和C语言开了一个玩笑，它被当作了第一个通用型语言，曾经广泛地用于各种场合，解决各种问题。可是它之后的语言，再也没有像它那样贴近硬件，它们拿掉了那些硬件相关的东西，变得越来越远离底层了。\\r\\n\\r\\n这门课，就是要告诉你C语言到底有哪些独特的地方，为什么能长期占据15%上下的编程语言份额。它是在前序课程--《程序设计入门-C语言》或《程序设计入门-Java语言》的基础上，让你完全掌握C语言本身的课程。\\r\\n\\r\\n虽然我们会借助一个Windows下的图形库来展开教学内容，但是用C语言写Windows程序已经是过去式了，我们并不是要教大家如何用C语言来写Windows程序，只是借一下故事而已。',
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 1, name: 'Calendar : app' },
            { id: 2, name: 'Chrome : app' },
            { id: 3, name: 'Webstorm : app' },
          ],
        },
        {
          id: 2,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 10, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 3,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: 'Downloads :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
          ],
        },
        {
          id: 5,
          name: 'Videos :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' },
              ],
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' },
          ],
        },
      ],
      comment_content: '主要是为了来了解大数据预测血糖的技术hhh\n' +
          '不愧是浙大的老师，颜值高讲的也很好，非常专业，美中不足就是涉及到很多机器学习和数理统计的知识，节奏比较快一带而过，算法的部分缺乏推导，不是很清晰。课程进度非常友好，三个月学完了这十章，非常认真的记了一个笔记本。期待以后还会有老师的课'
    }
  },
  methods: {
    async participateCourse() {
      let uid = window.localStorage.getItem("uid")
      if (uid !== null) {
        return
      }
    },
    pushCourse() {
      this.$router.push('/course/learn')
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
      color: white;
      min-width: 192px;
      height: 48px;
      font-weight: bold;
      font-size: 1rem;
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

  .m-information {

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
        }

        .f-f2 {
          float: left;
        }

        .comment-course-comment_comment-list_item_body {
          overflow: hidden;
          position: relative;
          left: 1%;

          .comment-course-comment_comment-list_item_body_user-info {
            margin-bottom: 9px;

            .comment-course-comment_comment-list_item_body_user-info_name{
              min-height: 31px;
            }
          }

          .comment-course-comment_comment-list_item_body_content {
            color: rgb(102, 102, 102);
            font-size: 14px;
            letter-spacing: 1.5px;
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