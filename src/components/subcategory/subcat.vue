<template>
  <div class="">
    <div class="centerx">
      <h3>الاقسام الفرعيه</h3>
      <vs-chip
        closable
        @click="deleteSubCategory(sub)"
        v-for="(sub, index) in subcategories"
        :key="index"
        color="warning"
        close-icon="close"
      >
        <vs-avatar @click="lanshUpdateDialoage(sub)" :src="sub.image" />
        {{ sub.nameAr }}
      </vs-chip>
      <addSubCategory :id="id" />
    </div>

    <vs-divider />

    <vs-prompt
      color="danger"
      :buttons-hidden="true"
      title="خدمة فرعية "
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <div id="div-with-loading">
          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="name"
            label-placeholder="الإسم باللغة العربية"
            v-model="subcat.nameAr"
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
            v-model="subcat.nameEn"
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
            v-model="subcat.contentAr"
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
            v-model="subcat.contentEn"
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
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex flex-wrap subcats-start mb-4">
   
            <vs-button
              class="mr-4 mb-4 mt-5"
              icon-pack="feather"
              icon="icon-edit"
              @click="uploadImage()"
              >تعديل</vs-button
            >
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import axiosApi from "../../axios";
import { Validator } from "vee-validate";
import addSubCategory from "./addSubServ";
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
    addSubCategory,
  },
  props: ["id"],
  data() {
    return {
      subcategories: [],
      subcat: null,
      name: "",
      photo: null,
      url: "",
      activePrompt: false,
      updateCategory: false,
      subcat: {
        name: "",
      },
    };
  },
  created() {
    this.getSubcategories();
  },

  methods: {
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    async uploadImage() {
      this.$vs.loading();

      if (
        this.photo != null &&
        this.subcat.image.includes("res.cloudinary.com")
      ) {
        let form_data = new FormData();
        form_data.append("image", this.photo);
        await axiosApi
          .post(`/resourses/image`, form_data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            this.subcat.image = response.data.url;
            console.log(response);
            this.updateSubCategory();
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (this.photo == null &&this.subcat.image.includes("res.cloudinary.com")) {
        this.updateSubCategory();
      } else {
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

    lanshUpdateDialoage(sub) {
      this.activePrompt = true;
      this.subcat = sub;
      this.url=sub.image
    },
    addItim(subService) {
      this.subcategories.push(subService.data);
    },

    updateSubCategory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$vs.loading();

          axiosApi
            .patch(`/subservice/${this.subcat._id}`, this.subcat)
            .then((response) => {
              this.$vs.loading.close();
              this.activePrompt = false;
              this.subcat=response.data
              this.$vs.notify({
                title: "حسنا ",
                text: "تم تعديل  القسم الفرعي  بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-check",
              });
            })
            .catch((e) => {
              this.$vs.loading.close();
              this.activePrompt = false;

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
        } else {
          // form have errors
        }
      });
    },
    deleteSubCategory(sub) {
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
                  .delete(`/subservice/${sub._id}`)
                  .then((response) => {
                    this.$vs.loading.close();
                    this.subcategories.splice(
                      this.subcategories.indexOf(
                        this.subcategories.find((o) => o._id == sub._id)
                      ),
                      1
                    );

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
    getSubcategories() {
      axiosApi.get(`/subservice/service/${this.id}`).then((response) => {
        console.log(response);
        this.subcategories = response.data.data;
      });
    },
  },
};
</script>

<style>
</style>