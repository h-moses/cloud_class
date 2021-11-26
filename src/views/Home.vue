<template>
  <v-app>
    <v-app-bar app>
      <v-img
          id="mooc-logo"
          alt="Mooc Logo"
          class="d-inline-block shrink mr-2"
          contain
          src="https://edu-image.nosdn.127.net/3310f128e53b406f94400f7ae6046db2.png?imageView&quality=100"
          transition="scale-transition"
          width="40"/>
      <v-btn class="register-login-btn" text plain>
        <span>登录 | 注册</span>
      </v-btn>
    </v-app-bar>
    <v-main id="home-container">
      <v-container fluid>
        <div class="d-flex justify-center">
          <div class="d-flex flex-column flex-nowrap course-column pa-4">
            <div v-for="(course,i) in courses" :key="i" class="mb-2">
              <span class="mr-2">{{course.main_category}}</span>
              <span v-for="(sub,j) in course.sub_category" :key="j" class="sub-category">
                <a title="sub">{{sub}}</a>
                <span v-if="j < course.sub_category.length - 1"> / </span>
              </span>
            </div>
          </div>
          <v-carousel cycle show-arrows-on-hover class="course-carousel mx-4">
            <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
          </v-carousel>
          <div class="user-column d-flex flex-column">
            <span class="pa-3 text-center">免费学习来自名校老师的精品课程</span>
            <div class="d-flex flex-column justify-start mt-6">
              <v-img class="align-self-center mb-4" contain src="http://edu-image.nosdn.127.net/6e66dbdc55464a44889c6a25428b2b4b.png?imageView&quality=100" max-width="100px" max-height="150px"/>
              <v-btn class="user-btn ma-4" rounded text>登录/注册</v-btn>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
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
        ]
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
</style>