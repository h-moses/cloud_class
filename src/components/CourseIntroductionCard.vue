<template>
  <div id="course-introduction-card">
    <v-img :src="course.cover" min-height="126" max-height="126"></v-img>
    <div class="mx-2 ">
      <div class="title" style="font-size: 14px !important;">{{course.title}}</div>
      <div class="department" v-if="department !== null">{{course.user.nick_name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseIntroductionCard",
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {

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
</style>