<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.name">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.name }}</p>
      <!-- <small>Available</small> -->
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          v-if="activeUserInfo.photo"
          key="onlineImg"
          :src="activeUserInfo.photo"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import * as Cookies from "js-cookie";

export default {
  data() {
    return {};
  },
  created() {
    // // console.log(JSON.parse(Cookies.get("user_data")).name);
  },
  computed: {
    activeUserInfo() {
      return JSON.parse(Cookies.get("user_data"));
    }
  },
  methods: {
    logout() {
      Cookies.remove("token");
      Cookies.remove("user_data");
      this.$router.push("/login").catch(() => {});
    }
  }
};
</script>
