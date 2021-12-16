<template>
  <v-app>
    <v-app-bar app elevation="0" style="background-color: white">
      <v-img
          id="mooc-logo"
          alt="Mooc Logo"
          class="d-inline-block shrink mr-2"
          contain
          src="https://edu-image.nosdn.127.net/3310f128e53b406f94400f7ae6046db2.png?imageView&quality=100"
          transition="scale-transition"
          width="40"/>
      <v-btn class="register-login-btn" text plain @click="pushLogin">
        <span>登录 | 注册</span>
      </v-btn>
    </v-app-bar>
    <v-main id="home-container">
      <v-container fluid>
        <div class="d-flex justify-center">
<!--          课程分类卡片-->
          <div class="d-flex flex-column flex-nowrap course-column pa-4">
            <div v-for="(course,i) in courses" :key="i" class="mb-2">
              <span class="mr-2">{{course.main_category}}</span>
              <span v-for="(sub,j) in course.sub_category" :key="j" class="sub-category">
                <a title="sub">{{sub}}</a>
                <span v-if="j < course.sub_category.length - 1"> / </span>
              </span>
            </div>
          </div>
<!--          轮播图-->
          <v-carousel cycle show-arrows-on-hover class="course-carousel mx-4">
            <v-carousel-item v-for="(item,i) in banners" :key="i" :src="item.cover"></v-carousel-item>
          </v-carousel>
<!--          登录卡片-->
          <div class="user-column d-flex flex-column">
            <span class="pa-3 text-center">免费学习来自名校老师的精品课程</span>
            <div class="d-flex flex-column justify-start mt-6">
              <v-img class="align-self-center mb-4" contain src="http://edu-image.nosdn.127.net/6e66dbdc55464a44889c6a25428b2b4b.png?imageView&quality=100" max-width="100px" max-height="150px"/>
              <v-btn class="user-btn ma-5" rounded text @click="pushLogin">登录/注册</v-btn>
            </div>
          </div>
        </div>
<!--        编辑推荐-->
        <div class="mt-5 d-flex flex-column justify-center">
          <div class="recommend-title mx-auto my-4">编辑推荐</div>
          <div class="recommend-course">
            <v-sheet class="mx-auto" elevation="0" max-width="1150">
              <v-slide-group v-model="selected" class="pa-4" active-class="success" show-arrows>
                <v-slide-item v-for="(item,i) in courseIntroductions" :key="i">
                  <v-card class="item-card ma-4" height="252" width="224">
                    <course-introduction-card :course-image="item.image" :course-name="item.name" :department="item.department" :author="item.author" :participants-number="item.number"  />
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </div>
        </div>
<!--        热门分类-->
        <div class="popular-categories mt-5 d-flex flex-column justify-center">
          <div class="category-title mx-auto my-4">热门分类</div>
          <v-sheet class="mx-auto transparent" elevation="0" max-width="1150">
            <v-chip-group active-class="success" column>
              <v-chip class="mt-3 mr-3 px-7" style="background-color: rgba(0,0,0,0.04)" v-for="(category, i) in categories" :key="i">{{category}}</v-chip>
            </v-chip-group>
          </v-sheet>
        </div>
<!--        登陆注册对话框-->
        <v-overlay :value="overlay">
          <v-dialog v-model="overlay" max-width="500">
            <v-card v-show="isLogin">
              <v-card-title>
                <span class="text-h5">用户登录</span>
              </v-card-title>
              <v-divider class="mb-5" />
              <v-card-text>
                <v-container id="login-dialog">
                  <v-row justify="center">
                    <v-col cols="10">
                      <v-text-field label="请输入手机号" required outlined prepend-inner-icon="mdi-cellphone"></v-text-field>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field label="请输入密码" type="password" required outlined prepend-inner-icon="mdi-lock"></v-text-field>
                    </v-col>
                    <v-col cols="10">
                      <v-btn color="#00CC7E" block>
                        <span style="color: white">登录</span>
                      </v-btn>
                    </v-col>
                    <v-col cols="10">
                      <v-checkbox class="auto-check" color="success" label="十天内免登录" value="auto_login" />
                      <span class="register-text mt-4 pt-1 text-decoration-underline" style="color: #00CC7E" @click="pushRegister">
                        去注册
                      </span>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
            <v-card v-show="!isLogin">
              <v-card-title>
                <span class="text-h5">手机号注册</span>
              </v-card-title>
              <v-divider class="mb-5" />
              <v-card-text>
                <v-container id="register-dialog">
                  <v-row justify="center">
                    <v-col cols="10">
                      <v-text-field label="请输入手机号" required outlined prepend-inner-icon="mdi-cellphone"></v-text-field>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field label="8到16位密码" required outlined prepend-inner-icon="mdi-lock"></v-text-field>
                    </v-col>
                    <v-col cols="10">
                      <v-btn color="#00CC7E" block>
                        <span style="color: white">注册并登录</span>
                      </v-btn>
                    </v-col>
                    <v-col cols="10">
                      <span class="register-text mt-4 pt-1 text-decoration-underline" style="color: #00CC7E" @click="pushLogin">已有账号，去登录</span>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

  import CourseIntroductionCard from "../components/CourseIntroductionCard";
  export default {
    name: 'Home',
    components: {CourseIntroductionCard},
    data() {
      return {
        overlay: false,
        isLogin: true,
        banners: [],

        courses: [
          {
            main_category: '计算机',
            sub_category: ['大数据与人工智能','软件工程']
          },
          {
            main_category: '外语',
            sub_category: ['听力','口语','写作','翻译']
          },
          {
            main_category: '理学',
            sub_category: ['数学','物理','化学','天文学']
          },
          {
            main_category: '工学',
            sub_category: ['力学','材料']
          }
        ],
        selected: null,
        categories: ['国家精品','期末不挂','22/23考研','考研冲刺','大学应试英语','实用英语','限时公开课','名师专栏','考证就业','计算机','音乐学院','外语','理学','工学','经济管理'],
        courseIntroductions: [
          {
            image:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            name: '基础设计',
            department:'浙江理工大学',
            author: 'hacky',
            number: 29,
          },
          {
            image:'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            name: '通信电路与系统',
            department:'华东理工大学',
            author: 'ck',
            number: 58,
          },
          {
            image:'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            name: '《说文解字》与上古社会',
            department:'武汉大学',
            author: 'jason',
            number: 51,
          },
          {
            image:'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            name: '分子生物学',
            department:'南京大学',
            author: 'chunk',
            number: 590,
          },
          {
            image:'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            name: '分子生物学',
            department:'南京大学',
            author: 'chunk',
            number: 590,
          },
          {
            image:'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            name: '分子生物学',
            department:'南京大学',
            author: 'chunk',
            number: 590,
          },
          {
            image:'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            name: '分子生物学',
            department:'南京大学',
            author: 'chunk',
            number: 590,
          }
        ]
      }
    },
    created() {
      this.getBanner()
    },
    methods: {
      pushLogin() {
        this.overlay = true
        this.isLogin = true
      },
      pushRegister() {
        this.isLogin = false
      },
      async getBanner() {
        const {data:res} = await this.$axios.post("banner/getAll", {'type': 'stu_home'})
        if (res.status === 200 && res.data !== []) {
          console.log(res.data)
          this.banners = res.data
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@mixin column_base {
  background: white;
  width: 200px;
  height: 360px !important;
}

::v-deep .v-toolbar__content, .v-toolbar__extension {
  justify-content: space-around;
}

#home-container {
  background-color: #F7F7F7;
}

#mooc-logo {
  min-width: 250px;
  max-width: 250px;
  max-height: 60%;
}

.register-login-btn {
  &:hover {
    color: #00c758;
  }
}

.course-carousel {
  width: 720px;
  height: 360px !important;
}

.course-column {
  @include column_base;

  ::v-deep .sub-category {
    color: #eee;
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
    color: white;
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

.auto-check {
  float: left;
}

.register-text {
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  float: right;
}
</style>