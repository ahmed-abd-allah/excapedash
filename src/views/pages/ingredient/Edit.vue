<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" v-if="item">
      <vs-card>
        <div slot="header">
          <h2>تعديل بيانات {{nameAr}}</h2>
        </div>
        <div id="div-with-loading">
          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="nameAr"
            label-placeholder="الإسم باللغة العربية"
            v-model="nameAr"
            class="w-full"
          />

          <span
            class="text-danger text-sm"
            v-show="errors.has('nameAr')"
          >{{ errors.first('nameAr') }}</span>

          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="nameEn"
            label-placeholder="الإسم باللغة الإنجليزية"
            v-model="nameEn"
            class="w-full mt-8"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('nameEn')"
          >{{ errors.first('nameEn') }}</span>
          <div class="con-img-upload">
            <div class="con-input-upload">
              <input name="photo" type="file" @change="fileSelected" />
              <span class="text-input">حدد الصورة</span>
              <span class="input-progress" style="width: 0%;"></span>

              <button
                disabled="disabled"
                type="button"
                title="Upload"
                class="btn-upload-all vs-upload--button-upload"
              >
                <i translate="translate" class="material-icons notranslate">cloud_upload</i>
              </button>
              <img :src="url" style="max-width: 100%; max-height: 80%;" />
            </div>
          </div>
          <vs-divider />
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="flex flex-wrap items-start mb-4">
                <vs-button
                  class="mr-4 mb-4"
                  icon-pack="feather"
                  icon="icon-edit"
                  @click="updateIngredient"
                >تعديل</vs-button>

                <vs-button
                  class="mr-4 mb-4"
                  icon-pack="feather"
                  icon="icon-trash-2"
                  color="danger"
                  @click="deleteIngredient"
                >حذف</vs-button>
                <vs-button
                  class="mb-4"
                  icon-pack="feather"
                  icon="icon-x"
                  color="success"
                  @click=" $router.push({ path: '/ingredient' }).catch(err => {});"
                >إلغاء</vs-button>
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
const dict = {
  custom: {
    nameAr: {
      required: "  من فضلك حدد الإسم باللغة العربية"
    },
    nameEn: {
      required: "من فضلك حدد الإسم باللغة الإنجليزية"
    }
  }
};

// register custom messages
Validator.localize("ar", dict);
export default {
  data() {
    return {
      item: null,
      nameAr: "",
      nameEn: "",
      photo: null,
      url: ""
    };
  },
  created() {
    this.getIngredient(this.$route.params.id);
  },

  methods: {
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    deleteIngredient() {
      if (this.$route.params.id > 0) {
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
                action: toast => {
                  this.$snotify.remove(toast.id);
                  this.$vs.loading();
                  axiosApi
                    .delete(`/ingredients/${this.$route.params.id}`)
                    .then(response => {
                      this.$vs.loading.close();
                      this.$router.push({ path: "/ingredient" });

                      this.$vs.notify({
                        title: "حسنا ",
                        text: "تم مسح المكون  بنجاح",
                        color: "success",
                        iconPack: "feather",
                        position: "top-right",
                        icon: "icon-check"
                      });
                    })
                    .catch(e => {
                      this.$vs.loading.close();
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
          }
        );
      } else {
      }
    },
    getIngredient() {
      if (this.$route.params.id > 0) {
        this.$vs.loading();
        axiosApi
          .get(`/ingredients/${this.$route.params.id}`)
          .then(res => {
            this.$vs.loading.close();
            this.item = res.data;
            this.nameEn = res.data.nameEn;
            this.nameAr = res.data.nameAr;
            this.url = res.data.photo;
          })
          .catch(e => {
            this.$vs.loading.close();
          });
      } else {
        this.$router.push({ path: "/ingredient" });
      }
    },
    updateIngredient() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading();
          let form_data = new FormData();
          form_data.append("nameAr", this.nameAr);
          form_data.append("nameEn", this.nameEn);
          if (this.photo != null) {
            form_data.append("photo", this.photo);
          }

          axiosApi
            .patch(`/ingredients/${this.$route.params.id}`, form_data, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              this.$router.push({ path: "/ingredient" });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم تعديل بيانات المكون  بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-left",
                icon: "icon-check"
              });
            })
            .catch(e => {
              this.$vs.loading.close();

              this.$vs.notify({
                title: "ًعفوا",
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

<style>
</style>