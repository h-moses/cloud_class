<template>
  <div id="exam-container">
    <div class="u-learn-moduletitle">
      <div class="text-h6">测验</div>
    </div>
    <div>
<!--      测验卡片-->
      <div class="u-chapterQuizItem" v-for="item in baseInfo" :key="item.id">
        <div class="u-titleName">第{{item.id}}周 {{item.title}}</div>
        <div class="u-quizList">
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>
                第{{item.id}}周测验
                <span class="tip-deadline">截止时间：{{ item.deadline }}</span>
                <template #actions>
                  <v-btn color="#1ED28D" width="100" ripple right @click="enterQuiz(item.id, item.title)">前往测验</v-btn>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="detail">
                <template #default>
                  <div class="u-infoItem">
                    <div class="infoItem">
                      <div class="f-fl">截止时间</div>
                      <div class="f-fl right">
                        <div class="submit-time">{{item.deadline}}</div>
                        <div class="tip">请务必在截止时间之前提交，截止时间后的提交不再计分</div>
                      </div>
                    </div>
                    <div class="infoItem">
                      <div class="f-fl">有效分数</div>
                      <div class="f-fl right">
                        <div class="submit-time">0.00 / {{item.totalScore}}</div>
                        <div class="tip">你的每一次测验系统都将为你计分，并提取最高得分作为你的有效分数</div>
                      </div>
                    </div>
                  </div>
                </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamComponent",
  data() {
    return {
      baseInfo: [],
      courseId: Number.MAX_VALUE
    }
  },
  created() {
    this.courseId = this.$route.query.cid
    this.getQuizBaseInfo()
  },
  methods: {

    /*
    * 获取并解析测验信息
    * */
    async getQuizBaseInfo() {
      const {data: res} = await this.$axios.post('course/getCourseTest',{'id': this.courseId})
      if (res.status === 200 && res.data !== null) {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          let info = {}
          // 存在测验
          if (data[i].testList.length !== 0) {
            info.id = data[i].order_id
            info.title = data[i].title
            info.deadline = '2022/02/27 23:00'
            let totalScore = 0
            let test = data[i].testList[0]
            // 计算测验总分
            test.singleQuestions.forEach(element => totalScore += element.score)
            test.judgeQuestions.forEach(element => totalScore += element.score)
            // 保证两位小数
            info.totalScore = totalScore.toFixed(2)
            this.baseInfo.push(info)
          }
        }
      }
    },
    enterQuiz(id,title) {
      this.$router.push({path: 'quiz', query: {'cid': String(this.courseId),'id':id, 'quizTitle': escape(title)}})
    }
  }
}
</script>

<style lang="scss" scoped>
.u-learn-moduletitle {
  padding: 10px 0;
  margin-bottom: 20px;
}

.u-titleName {
  font-size: 1.1em;
  margin-bottom: 10px;
}

.f-fl {
  float: left;
}

::v-deep .v-btn__content {
  color: white;
}

.tip-deadline {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}

.detail {
  display: inline-block;
  padding: 20px 20px 0 20px;

  .u-infoItem {
    display: inline-block;
    padding-left: 20px;

    .infoItem {
      display: inline-block;
      width: 900px;
      margin-bottom: 20px;
      //word-break: break-word;
      //word-wrap: break-word;
      font-size: 12px;

      .right {
        margin-left: 40px;

        .tip {
          color: #999;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>