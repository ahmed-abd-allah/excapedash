<template>
  <vs-row vs-justify="center">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="6"
      vs-sm="12"
    >
      <vs-card>
        <div slot="header" class>
          <h2 class="text-white">إضافة مستخدم</h2>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2"></div>
          <div class="vx-col w-full mb-2"></div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required'"
              name="name"
              label-placeholder="الإسم"
              v-model="user.name"
              class="w-full"
            />

            <span class="text-danger text-sm" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2"></div>

          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required|email'"
              name="email"
              label-placeholder="البريد الالكتروني"
              v-model="user.email"
              class="w-full"
            />

            <span class="text-danger text-sm" v-show="errors.has('email')">{{
              errors.first("email")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2"></div>

          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required'"
              type="password"
              name="password"
              label-placeholder="كلمة المرور"
              v-model="user.password"
              class="w-full"
            />

            <span class="text-danger text-sm" v-show="errors.has('password')">{{
              errors.first("password")
            }}</span>
          </div>
        </div>
        <div class="con-img-upload">
          <div class="con-input-upload">
            <input name="photo" type="file" @change="fileSelected" />
            <span class="text-input">صورة المستخدم</span>
            <span class="input-progress" style="width: 0%"></span>

            <button
              disabled="disabled"
              type="button"
              title="Upload"
              class="btn-upload-all vs-upload--button-upload"
            >
              <i translate="translate" class="material-icons notranslate"
                >cloud_upload</i
              >
            </button>
            <img :src="url" style="max-width: 100%; max-height: 80%" />
          </div>
        </div>
        <div class="flex flex-wrap justify-between my-5">
          <vs-button class="float-right" @click="uploadImage">
            <h3 class="text-white">إضافة</h3>
          </vs-button>
        </div>

        <!-- </form> -->
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import Datepicker from "vuejs-datepicker";

import axiosApi from "../../../axios";
import { Validator } from "vee-validate";
const dict = {
  messages: {
    required: () => "هذا الحقل مطلوب",
  },
  custom: {
    name: {
      required: "  من فضلك حدد الإسم باللغة العربية",
    },
    description: {
      required: "من فضلك ادخل الوصف  ",
    },
    phone: {
      required: "من فضلك ادخل السعر ",
      numeric: "يجب ان يحتوي  السعر علي أرقام فقط",
    },
    itemPrice: {
      required: "من فضلك ادخل السعر ",
      numeric: "يجب ان يحتوي  السعر علي أرقام فقط",
    },
    password: {
      required: "من فضلك ادخل كلمة المرور  ",
    },
  },
};

// register custom messages
Validator.localize("ar", dict);
export default {
  props: ["role"],
  components: {
    Datepicker,
  },
  data() {
    return {
      user: {},
      subCategory: null,
      subCategories: null,
      category: null,
      name: "",
      avaliableUnit: false,
      description: "",
      medicalDescription: "",
      itemPrice: "",
      unitPrice: "",

      photo: null,
      categories: [],
      url: "",
      //   role: "pharmacy"
    };
  },
  created() {},
  watch: {},
  methods: {
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    async uploadImage() {
      this.$vs.loading();

      if (this.photo != null) {
        let form_data = new FormData();
        form_data.append("image", this.photo);
        await axiosApi
          .post(`/resourses/image`, form_data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            this.user.photo = response.data.url;
            console.log(response);
            this.addUser();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
              this.$vs.loading.close();

        this.$vs.notify({
          title: "ًعفوا",
          text: "من فضلك  ادخل صورة المنتج ",
          color: "warning",
          iconPack: "feather",
          position: "top-right",
          icon: "icon-alert-circle",
        });
      }
    },
    addUser() {
      this.$validator.validateAll().then((result) => {
        if (result && this.photo != null) {
          this.user.role = "admin";
          axiosApi
            .post(`/user/signup`, this.user)
            .then((response) => {
              // this.$router.push({ path: `/client` });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم إضافة المستخدم   بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-check",
              });
            })
            .catch((e) => {
              this.$vs.loading.close();
              //   console.log(e);
              this.$vs.notify({
                title: "ًعفوا",
                text: "حدث خطئ تاكد من اتصال بالانترنت ",
                color: "warning",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-alert-circle",
              });
              console.log(e);
            });
        } else {
          this.$vs.notify({
            title: "ًعفوا",
            text: "من فضلك املاء كل البيانات  ",
            color: "warning",
            iconPack: "feather",
            position: "top-right",
            icon: "icon-alert-circle",
          });
        }
      });
    },
  },
};
</script>

<style>
</style>