

<template>
  <div id="profile-page" v-if="user != null">
    <!-- PROFILE HEADER -->
    <div class="profile-header">
      <div class="relative">
        <div class="cover-container rounded-t-lg">
          <img
            src="@/assets/images/bg-user.jpg"
            alt="user-profile-cover"
            class="responsive block user-profile-cover"
          />
        </div>
        <div class="profile-img-container pointer-events-none">
          <div>
            <vs-avatar class="user-profile-img" :src="user.photo" size="85px" />
          </div>
          <div class="profile-actions pointer-events-auto flex">
            <!-- <vs-button
              icon-pack="feather"
              radius
              icon="icon-edit-2"
            ></vs-button> -->
            <vs-button
            @click="deleteUser"
              icon-pack="feather"
              radius
              color="danger"
              icon="icon-delete"
              class="ml-2 lg:ml-4"
            ></vs-button>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-end flex-wrap profile-header-nav p-6"
      ></div>
    </div>

    <!-- COL AREA -->
    <div class="vx-row">
      <!-- COL 1 -->
      <div class="vx-col w-full lg:w-1/4">
        <!-- ABOUT CARD -->
        <vx-card title="التفاصيل " class="mt-base">
          <!-- ACTION SLOT -->
         

          <!-- USER BIO -->
          <div class="user-bio">
            <h6>الاسم:</h6>

            <p>
              {{user.name}}
            </p>
          </div>

          <!-- OTEHR DATA -->
         

          <!-- <div class="mt-5">
            <h6>Lives:</h6>
            <p>New York, USA</p>
          </div> -->

          <div class="mt-5">
            <h6>البريد الاكتروني:</h6>
            <p>{{user.email}}</p>
          </div>

          <div class="mt-5">
            <h6>الدور:</h6>
            <p>{{user.role}}</p>
          </div>

          <div class="social-links flex mt-4">
            <feather-icon
              svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"
              class="mr-2"
              icon="FacebookIcon"
            ></feather-icon>
            <feather-icon
              svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"
              class="mr-2"
              icon="TwitterIcon"
            ></feather-icon>
            <feather-icon
              svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"
              class="mr-2"
              icon="InstagramIcon"
            ></feather-icon>
          </div>
        </vx-card>

        <!-- PAGES SUGGESTION -->
     
      </div>

      <!-- COL 2 -->
    </div>

  </div>
</template>

<script>
import axiosApi from "../../../axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    mediaType() {
      return (media) => {
        if (media.img) {
          const ext = media.img.split(".").pop();
          if (this.mediaExtensions.img.includes(ext)) return "image";
        } else if (media.sources && media.poster) {
          // other validations
          return "video";
        }
      };
    },
  },
  methods: {
       
       deleteUser(status) {
      this.$snotify.confirm("  حذف المستخدم   ", "هل أنت متأكد ؟", {
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          {
            text: "موافق",
            action: toast => {
              axiosApi
                .delete(`/user/${this.$route.params.id}`)
                .then(response => {
                  this.$vs.loading.close();
                  this.$snotify.remove(toast.id);

                  this.$vs.notify({
                    title: "حسنا ",
                    text: "تم الحذف بنجاح",
                    color: "success",
                    iconPack: "feather",
                    position: "top-right",
                    icon: "icon-check"
                  });
                })
                .catch(e => {
                  this.$vs.loading.close();
                    console.log(e);
                  this.$vs.notify({
                    title: "ًعفوا",
                    text: "حدث خطئ تاكد من اتصال بالانترنت ",
                    color: "warning",
                    iconPack: "feather",
                    position: "top-right",
                    icon: "icon-alert-circle"
                  });
                  console.log(e);
                });
            },
            bold: true
          },
          {
            text: "إلغاء",
            action: toast => {
              this.$snotify.remove(toast.id);
            },
            bold: true
          }
        ]
      });
    },
    getUser() {
      this.$vs.loading();
      axiosApi
        .get(`/user/${this.$route.params.id}`)
        .then((res) => {
          this.$vs.loading.close();
          console.log(res);
          this.user = res.data.data;
        })
        .catch((e) => {
          console.log(e);
          this.$vs.loading.close();
          // this.$router.push({ path: "/category" });
        });
    },
    loadContent() {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-load-more-posts",
        scale: 0.45,
      });
      setTimeout(() => {
        this.$vs.loading.close("#button-load-more-posts > .con-vs-loading");
      }, 3000);
    },
  },
  components: {},
  mounted() {
    this.wasSidebarOpen = this.$store.state.reduceButton;
    this.$store.commit("TOGGLE_REDUCE_BUTTON", true);
  },
  beforeDestroy() {
    if (!this.wasSidebarOpen) this.$store.commit("TOGGLE_REDUCE_BUTTON", false);
  },
  created() {
    this.getUser();
  },
};
</script>


<style lang="scss">
@import "@/assets/scss/vuexy/pages/profile.scss";
.user-profile-cover{
  max-height: 300px;
}
</style>
