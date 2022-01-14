<template>
  <div id="course-introduction-card">
<!--    卡片-->
    <v-card class="pb-4" :width="width" :height="height" :to="{path: `/introduction`,query: {'cid': course.cid }}" hover ripple>
<!--      课程封面-->
      <v-img :src="course.cover" min-height="126" max-height="126"></v-img>
      <div class="mx-2 ">
        <div class="title" style="font-size: 14px !important;">{{course.title}}</div>
        <div class="instructor pt-1">{{course.user.nick_name}}</div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CourseIntroductionCard",
  props: {
    course: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    }
  },
}
</script>

<style lang="scss" scoped>
@mixin font-style($color,$size) {
  color: $color;
  font-size: $size;
}

#course-introduction-card {
  padding-bottom: 16px;
}

.title {
  color: #333;
  font-weight: bold !important;
  // 单行文字省略
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: PingFangSC-Medium, PingFangSC !important;
}

.instructor {
  @include font-style(#999999,12px);
}
</style>