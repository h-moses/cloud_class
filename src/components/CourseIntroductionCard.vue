<template>
  <div id="course-introduction-card">
    <v-img :src="courseImage" min-height="126" max-height="126"></v-img>
    <div class="mx-2 ">
      <div class="title" style="font-size: 14px !important;">{{courseName}}</div>
      <div class="department" v-if="department !== null">{{department}}</div>
      <div class="author mt-1" v-if="author !== null">{{author}}</div>
      <div class="pro-par d-flex justify-space-between">
        <span class="processing">{{isProcessing}}</span>
        <span class="participants">{{participantStr}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseIntroductionCard",
  props: {
    courseImage: {
      type: String,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: false
    },
    isProcessing: {
      type: Boolean,
      required: false
    },
    participantsNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    participantStr: function () {
      if (this.participantsNumber !== null) {
        return this.participantsNumber.toString().concat("人参加")
      } else {
        return "0".concat("人参加")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin font-style($color,$size) {
  color: $color;
  font-size: $size;
}

.title {
  color: #333;
  font-weight: bold !important;
  font-family: PingFangSC-Medium, PingFangSC !important;
}

.department {
  @include font-style(#666,12px);
}

.author, .processing, .participants {
  @include font-style(#999, 12px);
}

.pro-par {
  position: absolute;
  bottom: 11px;
  width: calc(100% - 24px);
  overflow: hidden;
}
</style>