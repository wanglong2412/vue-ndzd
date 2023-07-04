<template>
  <div>
    <h1>{{name}}</h1>
    <span @click="handleChange('children1')">children1</span>
    <span @click="handleChange('children2')">children2</span>
    <span @click="handleChange('children1')">children1</span>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'TestIndex',
    data() {
      return {
        name: ''
      }
    },
    methods: {
      handleChange(type) {
        this.name = type
        this.$router.replace({
          name: type
        })
      }
    },
    created() {
      console.log('TestIndex')
    }
  }
</script>

<style scoped>

</style>
