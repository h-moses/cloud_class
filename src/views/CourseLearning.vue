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
                    <v-list-item class="u-greentab j-tabitem" v-for="item in items" :key="item.title" :to="item.path" color="#FFF" active-class="u-curtab" link>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title}}</v-list-item-title>
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
    </v-main>
</template>

<script>
export default {
  name: "CourseLearning",
  data() {
    return {
      items: [
        {title: '公告', path:'/learn/announce'},
        {title: '课件', path: '/learn/content'},
        {title: '测验', path: '/learn/exam'}
      ],
      courseInfo: {
        id: null,
        name: null,
        cover: null,
        instructor: null
      },
      courseId: 0,
      selectedItem: 1
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
    }
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
</style>