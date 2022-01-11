<template>
  <div id="quiz-container">
    <div class="u-learn-moduletitle">
      <div class="text-h6 f-fl">第{{this.qid}}周测验</div>
      <router-link class="f-fr" style="font-size: 12px;color: #00CC7E;" :to="{path: 'testlist', query:{'cid': this.cid}}">返回</router-link>
    </div>
    <div class="question-list">
      <div class="question-item" v-for="item in questionList" :key="item.id">
        <div class="question_title">
          <div class="question_position f-fl">{{item.id}}</div>
          <div class="question-desc f-fl">
            <div class="type-score f-fl">
              <span class="dan" v-if="item.type === 'single'">单选</span>
              <span v-else class="dan">判断</span>
              ({{item.score}}分)
            </div>
            <div class="f-fl">{{item.name}}</div>
          </div>
        </div>
        <div class="option-group">
          <v-radio-group v-model="selectedOption[item.id]" column >
            <v-radio v-for="(option,i) in item.options" :key="i" :label="option" :value="i">
            </v-radio>
          </v-radio-group>
        </div>
      </div>
    </div>
    <div class="submit-result" v-show="result">本次得分为：{{this.score.toFixed(2)}}/{{this.totalScore.toFixed(2)}}，如果你认为本次测试成绩不理想，你可以选择再做一次。</div>
    <v-btn class="mt-10" color="#00CC7E" @click="dialog = true">提交答案</v-btn>
    <v-dialog v-model="dialog" persistent>
      <v-card width="300">
        <div class="d-flex flex-no-wrap justify-space-between align-center">
          <v-icon right left size="60" color="blue">mdi-alert-circle</v-icon>
          <div>

            <v-card-subtitle >提交后本次测验尝试的答案将不可修改，确定要提交？</v-card-subtitle>

            <v-card-actions class="d-flex align-center pa-4">
              <v-btn class="ml-10" color="blue" @click="submitAnswer">
                确认
              </v-btn>
              <v-btn class="ml-4" color="orange" @click="dialog = false">
                取消
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "QuizComponent",
  data() {
    return {
      cid: Number.MAX_VALUE,
      qid: Number.MAX_VALUE,
      score: 0,
      totalScore: 0,
      dialog: false,
      result: false,
      selectedOption: [],
      questionList: []
    }
  },
  created() {
    this.cid = this.$route.query.cid
    this.qid = this.$route.query.id
    this.getQuestionList()
  },
  methods: {
    async getQuestionList() {
      const {data: res} = await this.$axios.post('course/getCourseTest',{'id': this.cid})
      if (res.status === 200 && res.data !== null) {
        let data = res.data[this.qid-1].testList[0]
        data.singleQuestions.forEach(element => {
          let question = {}
          question.id = element.id
          question.type = element.question_type
          this.totalScore += parseFloat(element.score)
          question.score = element.score
          question.name = element.questionSingle.question
          question.answer = this.convertAnswer(element.questionSingle.answer)
          let options = []
          options.push(element.questionSingle.optionA,element.questionSingle.optionB,element.questionSingle.optionC,element.questionSingle.optionD)
          question.options = options
          this.questionList.push(question)
        })
        data.judgeQuestions.forEach(element => {
          let question = {}
          question.id = element.id
          question.type = element.question_type
          this.totalScore += parseFloat(element.score)
          question.score = element.score
          question.name = element.questionJudge.question
          question.answer = this.convertAnswer(element.questionJudge.answer)
          let options = ['正确','错误']
          question.options = options
          this.questionList.push(question)
        })
      }
    },
    convertAnswer(answer) {
      switch (answer) {
        case 'A':
          return 0
        case 'B':
          return 1
        case 'C':
          return 2
        case 'D':
          return 3
        case '正确':
          return 0
        case '错误':
          return 1
      }
    },
    submitAnswer() {
      for (let i = 1; i < this.selectedOption.length; i++) {
        if (this.selectedOption[i] === this.questionList[i-1].answer) {
          this.score += parseInt(this.questionList[i-1].score)
        }
      }
      this.dialog = false
      this.result = true

    }
  }
}
</script>

<style lang="scss" scoped>
.f-fl {
  float: left;
}

.f-fr {
  float: right;
}

::v-deep .v-btn__content {
  color: white;
}

.u-learn-moduletitle {
  display: inline-block;
  width: 700px;
  padding: 10px 0;
  margin-bottom: 20px;
}


.question-item {
  padding: 18px 0 5px;
  width: 800px;
  border-bottom: 1px solid #D9D9D9;

  .question_title {
    display: inline-block;
  }

  .question_position {
    width: 38px;
    font-size: 20px;
    color: #333;
  }

  .question-desc {
    height: 30px;

    .type-score {
      height: 30px;
      margin-right: 10px;
      font-size: 14px;
      color: #666;

      .dan {
        font-size: 12px;
        background-color: #e3F8FF;
        border: 1px solid #bfdfff;
        border-radius: 2px;
        padding: 2px 4px;
        margin-right: 5px;
      }
    }
  }
}

.submit-result {
  width: 700px;
  margin-top: 24px;
  padding: 16px;
  color: black;
  background-color: #FEFFD1;
}

</style>