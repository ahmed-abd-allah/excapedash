<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto" />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container" id="div-with-loading">
                <div
                  class="con-vs-avatar mx-auto my-6 block 80px"
                  style="width: 80px; height: 80px; background: rgb(195, 195, 195);"
                >
                  <!---->
                  <div class="con-img vs-avatar--con-img">
                    <img src="@/assets/images/logo/logo.jpg" alt />
                  </div>
                </div>

                <div class="vx-card__title mb-5 text-center">
                  <h4 class="mb-4">تسجيل الدخول</h4>
                  <!-- <p>Welcome back, please login to your account.</p> -->
                </div>

                <div>
                  <form>
                    <vs-input
                      autocomplete="off"
                      v-validate="'required'"
                      name="phone"
                      icon-no-border
                      icon="icon icon-phone"
                      icon-pack="feather"
                      label-placeholder="رقم الهاتف"
                      v-model="loginForm.email"
                      class="w-full"
                    />

                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('phone')"
                    >{{ errors.first('phone') }}</span>

                    <vs-input
                      autocomplete="off"
                      v-validate="'required'"
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      label-placeholder="كلمة المرور"
                      v-model="loginForm.password"
                      class="w-full mt-8"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('password')"
                    >{{ errors.first('password') }}</span>

                    <div class="flex flex-wrap justify-between my-5">
                      <vs-button
                        class="float-right"
                        type="filled"
                        @click.prevent="login"
                      >تسجيل الدخول</vs-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axiosApi from "../../axios";
import * as Cookies from "js-cookie";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    phone: {
      required: "من فضلك حدد رقم الهاتف",
      alpha: "Your first name may only contain alphabetic characters"
    },
    password: {
      required: "من فضلك حدد كلمة المرور",
      alpha: "Your last name may only contain alphabetic characters"
    }
  }
};

// register custom messages
Validator.localize("ar", dict);
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },

      checkbox_remember_me: false
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading({
            container: "#div-with-loading",
            scale: 0.6
          });
          axiosApi
            .post("/user/login", this.loginForm)
            .then(response => {
              // console.log("user data", response.data);
              Cookies.set("token", response.data.token);
              Cookies.set("user_data", response.data.user);

              this.$vs.loading.close("#div-with-loading > .con-vs-loading");
              this.$router.push({ path: "/" });

              this.$vs.notify({
                title: "مرحبا ",
                text: "مرحبا بك في لوحة تحكم  كيان ",
                color: "success",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-check"
              });
            })
            .catch(e => {
              this.$vs.loading.close("#div-with-loading > .con-vs-loading");
              this.$vs.notify({
                title: "عفوا",
                text: "حدد البيانات المطلوبة من فضلك",
                color: "warning",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-alert-circle"
              });
              console.log(e);
            });
        } else {
          // form have errors
        }
      });
    }
  }
};
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
