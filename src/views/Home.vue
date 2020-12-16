<template>
  <h4>You are in Kayan home.</h4>
</template>
<script>
import axiosApi from "../axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false
    };
  },
  created() {}
};
</script>