<template>
    <v-main id="home-container">
      <v-container fluid>
        <div class="d-flex justify-center">
<!--          课程分类卡片-->
          <div class="d-flex flex-column flex-nowrap course-column pa-4">
            <div v-for="firstCategory in allCategories" :key="firstCategory.id" class="mb-2">
              <span class="mr-2">{{firstCategory.name}}</span>
              <span v-for="(secondCategory,i) in firstCategory.children" :key="secondCategory.id" class="sub-category">
                <a title="secondCategory.name">{{secondCategory.name}}</a>
                <span v-if="i !== firstCategory.children.length - 1"> / </span>
              </span>
            </div>
          </div>
<!--          轮播图-->
          <v-carousel cycle show-arrows-on-hover class="course-carousel mx-4">
            <v-carousel-item v-for="(item,i) in banners" :key="i" :src="item.cover"></v-carousel-item>
          </v-carousel>
<!--          登录卡片-->
          <div class="user-column d-flex flex-column">
            <span class="pa-3 text-center">{{welcome}}</span>
            <div class="d-flex flex-column justify-start mt-6">
              <v-img class="align-self-center mb-4" contain :src="this.userAvatar" max-width="100px" max-height="150px"/>
              <v-btn v-show="!hasLogin" class="user-btn ma-5" rounded text @click="overlay = true">{{ this.userName }}</v-btn>
            </div>
          </div>
        </div>
<!--        不同类别的课程-->
        <div class="mt-5 d-flex flex-column justify-center" v-for="item in allCourse" :key="item.id">
          <div class="recommend-title mx-auto my-4">{{ item.name }}</div>
          <div class="recommend-course">
            <v-sheet class="mx-auto" elevation="0" max-width="1150">
              <v-slide-group v-model="selected" class="pa-4" active-class="success" show-arrows>
                <v-slide-item v-for="course in item.courseList" :key="course.cid">
                  <course-introduction-card class="ma-4" width="224" height="252" :course="course"/>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </div>
        </div>
<!--        登陆注册对话框-->
        <login-dialog-component :overlay="overlay" @updateOverlay="overlay = $event" />
      </v-container>
    </v-main>
</template>

<script>

  import {mapState, mapGetters} from 'vuex';
  import CourseIntroductionCard from "../components/CourseIntroductionCard";
  import LoginDialogComponent from "../components/LoginDialogComponent";

  export default {
    name: 'Home',
    components: {LoginDialogComponent, CourseIntroductionCard},
    data() {
      return {
        overlay: false,
        // 轮播图数组
        banners: [],
        // 所有课程
        allCourse: [],
        // 所有类别
        allCategories: [],
        // 所选课程
        selected: null,
      }
    },
    created() {
      this.getBanner()
      this.getAllCourse()
      this.getAllCategories()
    },
    methods: {
      /*
      * 获取轮播图资源
      * */
      async getBanner() {
        const {data:res} = await this.$axios.post("banner/getAll", {'type': 'stu_home'})
        if (res.status === 200 && res.data !== []) {
          this.banners = res.data
        }
      },
      /*
      * 获取所有课程
      * */
      async getAllCourse() {
        const {data:res} = await this.$axios.get('course/getAllCourseSortByCategory')
        if (res.status === 200 && res.data !== []) {
          this.allCourse = res.data
        }
      },
      /*
      * 获取所有课程类别
      * */
      async getAllCategories() {
        const {data: res} = await this.$axios.get('course_category/getTreeList')
        if (res.status === 200 && res.data !== []) {
          this.allCategories = res.data
        }
      },
    },
    computed: {
      ...mapState({
        welcome: state => {
          if (state.userInfo !== null) {
            return `欢迎回来，${state.userInfo.nick_name}`
          } else {
            return '免费学习来自名校老师的精品课程'
          }
        },
        userAvatar: state => {
          if (state.userInfo !== null) {
            return state.userInfo.avatar
          } else {
            return state.lazySrc
          }
        },
        hasLogin: state => state.isLogin
      }),
     ...mapGetters([
         "uid",
         "userName",
     ]),
    }
  }
</script>

<style lang="scss" scoped>
@mixin column_base {
  background: white;
  width: 200px;
  height: 360px !important;
}

#home-container {
  background-color: #F7F7F7;
}

.course-carousel {
  width: 720px;
  height: 360px !important;
}

.course-column {
  @include column_base;
  overflow: hidden;  /*超出宽度部分隐藏*/
  text-overflow: ellipsis;  /*超出部分以点号代替*/

  ::v-deep .sub-category {
    color: #999999;
    font-size: 12px;

    a {
      color: #999999;
      &:hover {
        color: #00CC7E;
        text-decoration: underline;
      }
    }
  }
}

.user-column {
  @include column_base;

  .user-btn {
    background-color: #00B36E;

    // 按钮字体颜色
    ::v-deep .v-btn__content {
      color: white;
    }
  }
}

.recommend-title, .category-title {
  text-align: start;
  max-width: 1150px;
  min-width: 1150px;
  font-size: 20px;
}

::v-deep .col {
  padding: 0;
}

</style>