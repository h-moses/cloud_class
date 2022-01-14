<template>
  <v-main id="user-info">
    <v-img class="top-back" width="100%" height="220" :src="topBack" />
    <div class="userinfo-container">
<!--      用户头像-->
      <v-avatar class="u-img" left width="102" height="102">
        <v-img :src="this.userAvatar" :lazy-src="this.lazySrc" />
      </v-avatar>
<!--      用户昵称-->
      <div class="u-name">
        <span>{{this.userName}}</span>
      </div>
<!--      用户身份-->
      <div class="u-tag">
        <span>学生 | 浙江理工 - 信息学院</span>
      </div>
      <div class="u-f2f">
        <span>
          <span>关注0人</span>
          |
          <span>粉丝0人</span>
        </span>
      </div>
    </div>
    <div class="home-content">
      <div class="main-content">
        <div class="main-box">
<!--          标签头-->
          <v-tabs class="module-tabs" v-model="selectedTab" color="success">
            <v-tabs-slider color="#00c758"></v-tabs-slider>
            <v-tab v-for="item in module_tabs" :key="item">{{item}}</v-tab>
          </v-tabs>
<!--          标签页-->
          <v-tabs-items v-model="selectedTab">
<!--            已参加课程-->
            <v-tab-item>
              <template #default>
                <v-row justify="center">
                  <v-col v-for="item in involvedCourses" :key="item.id" cols="3">
                    <course-introduction-card :course="item" />
                  </v-col>
                </v-row>
              </template>
            </v-tab-item>
<!--            已参加专栏-->
            <v-tab-item>
              <template #default>
                <div class="empty-guide flex justify-center">
                  <v-img class="empty-img" width="172" height="172" :src="empty_img" :lazy-src="empty_img" />
                  <p class="empty-tip">你还没有参加任何专栏</p>
                </div>
              </template>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>

import {mapState, mapGetters} from 'vuex'
import CourseIntroductionCard from "../components/CourseIntroductionCard";

export default {
  name: "UserInfo",
  components: {CourseIntroductionCard},
  data() {
    return {
      //背景图片
      topBack: 'http://edu-image.nosdn.127.net/6cc94d6565544f47ac9c2342ab7e735e.png?imageView&quality=100',
      selectedTab: null,
      module_tabs: ['课程','专栏'],
      // 无任何专栏时的图片
      empty_img: 'https://edu-image.nosdn.127.net/47c362405a924f0e8df46544eb4bb51d.png?imageView&quality=100',
      involvedCourses: []
    }
  },
  created() {
    this.getInvolvedCourse()
  },
  methods: {
    /*
    * 获取用户已参加的课程
    * */
    async getInvolvedCourse() {
      const {data:res} = await this.$axios.post('course/getLearntCourse?', {'uid': this.uid})
      if (res.status === 200 && res.data !== null) {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          let course = {'user': {}}
          course.cid = data[i].course.cid
          course.title = data[i].course.title
          course.cover = data[i].course.cover
          course.user.nick_name = data[i].course.user.nick_name
          this.involvedCourses.push(course)
        }
      }
    }
  },
  computed: {
    ...mapState([
        "lazySrc"
    ]),
    ...mapGetters([
        "uid",
        "userName",
        "userAvatar"
    ])
  }
}
</script>

<style lang="scss" scoped>
@mixin u-fontStyle($size,$letterSpacing:1) {
  font-size: $size;
  letter-spacing: $letterSpacing;
  color: white;
  vertical-align: middle;
}

#user-info {
  padding-bottom: 300px;
  background-color: #eee;
}

.top-back {
  vertical-align: top;
  position: absolute;
}

.userinfo-container {
  top: 0;
  left: 0;
  height: 220px;
  position: relative;

  .u-img {
    left: 20%;
    top: 40px;
    position: absolute;
    z-index: 3;
  }

  .u-name {
    left: 28%;
    top: 40px;
    width: 564px;
    position: absolute;
    z-index: 3;

    span {
      @include u-fontStyle(26px)
    }

  }

  .u-tag {
    left: 28%;
    top: 78px;
    width: 564px;
    position: absolute;
    z-index: 3;
    span {
      @include u-fontStyle(13px, 1.2px)
    }
  }

  .u-f2f {
    left: 28%;
    top: 102px;
    width: 500px;
    position: absolute;
    z-index: 3;
    span {
      @include u-fontStyle(16px,1.2px);
    }
  }
}

.f-fl {
  float: left;
}

.home-content {
  margin: 20px auto 40px;

  .main-box {
    width: 950px;
    margin: 0 auto;
    padding: 0 24px 40px;
    background-color: #fff;

    .module-tabs {
      margin-bottom: 40px;
    }
  }
}

.empty-guide {
  padding-bottom: 70px;
  text-align: center;

  .empty-img {
    display: inline-block;
    background-size: 100% 100%;
    margin: 50px 0 8px;
  }

  .empty-tip {
    font-size: 14px;
    color: #999;
  }
}
</style>