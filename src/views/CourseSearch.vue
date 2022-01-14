<template>
  <v-main id="course-search">
    <div>
<!--      搜索结果个数-->
      <div class="search-title">共{{this.result_count}}条<font style="color: #00CC7E">{{this.search_text}}</font>相关的结果</div>
<!--      搜索列表，有结果才显示-->
      <div class="search-result" v-show="result_count > 0">
<!--        课程-->
        <v-card class="result-item" v-for="item in search_result" :key="item.cid" elevation="0" ripple @click="enterCourse(item.cid)">
          <v-img class="my-3 f-fl" width="250" height="150" :src="item.cover" :lazy-src="lazySrc"></v-img>
          <v-card-title>
            {{item.title}}
          </v-card-title>
        </v-card>
      </div>
    </div>
  </v-main>
</template>

<script>

import {mapState} from 'vuex'

export default {
  name: "CourseSearch",
  data() {
    return {
      // 搜索关键字
      search_text: '',
      // 结果数组
      search_result: [],
      // 结果个数
      result_count: 0
    }
  },
  created() {
    this.search_text = this.$route.query.key
    this.searchCourse()
  },
  methods: {
    /*
    * 根据关键字搜索
    * */
    async searchCourse() {
      const {data:res} = await this.$axios.post('course/searchCourse',{'key': this.search_text})
      if (res.status === 200) {
        this.search_result = res.data
        this.result_count = res.data.length
      }
    },
    /*
    * 点击课程卡片可以进入详情页面
    * */
    enterCourse(cid) {
      this.$router.push({path:'/introduction', query: {'cid': cid}})
    }
  },
  computed: {
    ...mapState([
        "lazySrc"
    ])
  }
}
</script>

<style lang="scss" scoped>
#course-search {
  background-color: #F5F5F5;
}

.search-title {
  // 左对齐
  width: 900px;
  // 居中
  margin: 32px auto;
  font-size: 16px;
  color: black;
}

.search-result {
  background-color: white;
  width: 900px;
  height: 900px;
  margin: 24px auto 24px;
  overflow: hidden; // 高度塌陷
}

.f-fl {
  float: left;
}

.result-item {
  height: 180px;
  border-bottom: 1px solid #E6E6E6;
}

.course-desc {
  //margin-left: 260px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>