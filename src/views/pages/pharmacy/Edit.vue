<template>
 <updateUser role="pharmacy"></updateUser>
</template>

<script>
import  updateUser from '@/components/updateUser.vue'

// register custom messages
export default {
  props: ["role"],
  components: {
    updateUser
  },
  data() {
    return {
    }
  },
  created() {
 
  },
  methods: {

  }
};
</script>

<style>
</style>