<template>
  <vs-row vs-justify="center">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="6"
      vs-sm="12"
      v-if="item"
    >
      <vs-card>
        <div slot="header">
          <h2 class="text-white">تعديل قسم {{ name }}</h2>
        </div>
        <div id="div-with-loading">
          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="name"
            label-placeholder="الإسم باللغة العربية"
            v-model="item.nameAr"
            class="w-full"
          />

          <span class="text-danger text-sm" v-show="errors.has('name')">{{
            errors.first("name")
          }}</span>

          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="nameEn"
            label-placeholder="الإسم باللغة الإنجليزية"
            v-model="item.nameEn"
            class="w-full mt-8"
          />
          <span class="text-danger text-sm" v-show="errors.has('nameEn')">{{
            errors.first("nameEn")
          }}</span>
          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="contentAr"
            label-placeholder="الوصف باللغة العربية"
            v-model="item.contentAr"
            class="w-full mt-8"
          />
          <span class="text-danger text-sm" v-show="errors.has('contentAr')">{{
            errors.first("contentAr")
          }}</span>
          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="contentEn"
            label-placeholder="الوصف باللغة الإنجليزية"
            v-model="item.contentEn"
            class="w-full mt-8"
          />
          <span class="text-danger text-sm" v-show="errors.has('contentEn')">{{
            errors.first("contentEn")
          }}</span>

          <label for="myfile"></label>
          <div class="con-img-upload">
            <div class="con-input-upload">
              <input name="photo" type="file" @change="fileSelected" />
              <span class="text-input">حدد الصورة</span>
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
          <div class="centerx">
            <subcat :id="$route.params.id" />
          </div>

          <vs-divider />
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="flex flex-wrap items-start mb-4">
                <vs-button
                  class="mr-4 mb-4"
                  icon-pack="feather"
                  icon="icon-edit"
                  @click="uploadImage()"
                  >تعديل</vs-button
                >

                <vs-button
                  class="mr-4 mb-4"
                  icon-pack="feather"
                  icon="icon-trash-2"
                  color="danger"
                  @click="deleteCategory"
                  >حذف</vs-button
                >
                <vs-button
                  class="mb-4"
                  icon-pack="feather"
                  icon="icon-x"
                  color="success"
                  @click="
                    $router.push({ path: '/category' }).catch((err) => {})
                  "
                  >إلغاء</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import axiosApi from "../../../axios";
import { Validator } from "vee-validate";
import subcat from "@/components/subcategory/subcat.vue";
const dict = {
  custom: {
    name: {
      required: "  من فضلك حدد الإسم باللغة العربية",
    },
    nameEn: {
      required: "من فضلك حدد الإسم باللغة الإنجليزية",
    },
  },
};

// register custom messages
Validator.localize("ar", dict);
export default {
  components: {
    subcat,
  },
  data() {
    return {
      item: null,
      name: "",
      photo: null,
      url: "",

      subcat: {
        name: "",
      },
    };
  },
  created() {
    this.getCategory(this.$route.params.id);
  },

  methods: {
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    deleteCategory() {
      this.$snotify.confirm(
        "في حالة مسح البيانات لا يمكنك إسترجاعها مرة أخري",
        "هل أنت متأكد ؟",
        {
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          buttons: [
            {
              text: "موافق",
              action: (toast) => {
                this.$snotify.remove(toast.id);
                this.$vs.loading();
                axiosApi
                  .delete(`/service/${this.$route.params.id}`)
                  .then((response) => {
                    this.$vs.loading.close();
                    this.$router.push({ path: "/category" });

                    this.$vs.notify({
                      title: "حسنا ",
                      text: "تم مسح الخدمة  بنجاح",
                      color: "success",
                      iconPack: "feather",
                      position: "top-right",
                      icon: "icon-check",
                    });
                  })
                  .catch((e) => {
                    this.$vs.loading.close();
                  });
              },
              bold: true,
            },
            {
              text: "إلغاء",
              action: (toast) => {
                this.$snotify.remove(toast.id);
              },
              bold: true,
            },
          ],
        }
      );
    },
    getCategory() {
      this.$vs.loading();
      axiosApi
        .get(`/service/${this.$route.params.id}`)
        .then((res) => {
          this.$vs.loading.close();
          console.log(res);

          this.item = res.data.data;
          this.url = this.item.image;
        })
        .catch((e) => {
          console.log(e);
          this.$vs.loading.close();
          // this.$router.push({ path: "/category" });
        });
    },
    async uploadImage() {
      this.$vs.loading();

      if (this.photo != null&&this.item.image.includes("res.cloudinary.com")) {
        let form_data = new FormData();
        form_data.append("image", this.photo);
        await axiosApi
          .post(`/resourses/image`, form_data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => { 
            this.item.image = response.data.url;
            console.log(response);
            this.updateCategory();
          })
          .catch((e) => {
            console.log(e);
          });
      } else if(this.photo == null&&this.item.image.includes("res.cloudinary.com")) {
        this.updateCategory()
      }
      else {
        this.$vs.loading.close();

        this.$vs.notify({
          title: "ًعفوا",
          text: "من فضلك  ادخل صورة الخدمة ",
          color: "warning",
          iconPack: "feather",
          position: "top-right",
          icon: "icon-alert-circle",
        });
      }
    },
    updateCategory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$vs.loading();

          axiosApi
            .patch(`/service/${this.$route.params.id}`, this.item)
            .then((response) => {
              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم تعديل بيانات الخدمة   بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-left",
                icon: "icon-check",
              });
            })
            .catch((e) => {
              this.$vs.loading.close();

              this.$vs.notify({
                title: "ًعفوا",
                text: "حدد البيانات المطلوبة من فضلك",
                color: "warning",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-alert-circle",
              });
              console.log(e);
            });
        }
      });
    },
  },
};
</script>

<style>
</style>