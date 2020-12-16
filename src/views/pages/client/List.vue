<template>
<div class="">
       
 <vs-tabs :color="colorx" alignment="center">
    <vs-tab @click="colorx = 'warning'" label="عملاء " icon="hourglass_empty">
      <showUsers role="user"></showUsers>
    </vs-tab>
    <vs-tab @click="colorx = 'success'" label="مستخدمين " icon="hourglass_empty">
      <showUsers role="admin"></showUsers>
    </vs-tab>
  </vs-tabs>
</div>
 
</template>

<script>
import showUsers from "@/components/showUsers.vue";
export default {
  components: {
    showUsers,
  },
  data() {
    return {
      colorx: "warning",
    };
  },
};
</script>

<style lang="stylus"></style>