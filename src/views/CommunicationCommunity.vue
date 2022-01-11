<template>
  <v-main id="community-container">
    <div class="dynamic-list my-5">
      <dynamic-item-component class="dynamic-item" v-for="source in dynamicList" :key="source.id" :source="source" />
    </div>
  </v-main>
</template>

<script>

import DynamicItemComponent from "../components/DynamicItemComponent";

export default {
  name: "CommunicationCommunity",
  components: {DynamicItemComponent},
  data() {
    return {
      dynamicList: []
    }
  },
  created() {
    this.getAllDynamic()
  },
  methods: {
    async getAllDynamic() {
      const {data: res} = await this.$axios.get('find/getAllShare')
      if (res.status === 200) {
        this.dynamicList = res.data
        console.log(this.dynamicList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#community-container {
  background-color: #F5F5F5;
}

.dynamic-item {
  margin: 0 auto 20px;
}

</style>