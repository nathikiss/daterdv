<template>
  <input type="datetime-local" v-model="mydatetime" />
</template>
<script>
export default {
  name: "Datepicker",
  data() {
    return {
      mydatetime: null,
    };
  }
  };
</script>

<style scoped>
</style>