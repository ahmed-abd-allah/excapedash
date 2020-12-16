<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <p>
      <span></span>
      <span>{{ new Date().getFullYear() }}</span>
      <a href="" target="_blank" rel="nofollow">&nbsp;Excape</a>
      <span class="hidden sm:inline-block">&copy;, All rights Reserved</span>
    </p>
    <span class="md:flex hidden items-center">
      <span></span>
      <feather-icon icon="HeartIcon" svgClasses="stroke-current text-prymim w-6 h-6" class="ml-2" />
    </span>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  props: {
    classes: {
      type: String
    }
  }
};
</script>
