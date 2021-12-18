<template>
  <div id="course-introduction-card">
    <v-img :src="courseImage" min-height="126" max-height="126"></v-img>
    <div class="mx-2 ">
      <div class="title" style="font-size: 14px !important;">{{courseName}}</div>
      <div class="department" v-if="department !== null">{{department}}</div>
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
      required: true
    },
  },
  data() {
    return {

    }
  },
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
</style>