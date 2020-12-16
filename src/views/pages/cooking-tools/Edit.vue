<template>
  <vs-row vs-justify="center">
    <div class="item-content" v-if="item&&!edited">
      <!-- Item Main Info -->
      <div class="product-details p-6">
        <div class="vx-row mt-6">
          <div class="vx-col md:w-2/5 w-full flex items-center justify-center">
            <div class="product-img-container w-3/5 mx-auto mb-10 md:mb-0">
              <img
                v-if="photo!=null&&photo.length>0"
                :src="photo[0]"
                :alt="nameAr"
                class="responsive"
              />
              <img v-else src="@/assets/images/pages/no-img.png" :alt="nameAr" class="responsive" />
            </div>
          </div>

          <!-- Item Content -->
          <div class="vx-col md:w-3/5 w-full">
            <h3>{{ nameAr }}</h3>

            <p class="my-2">
              <span>{{ nameEn }}</span>
            </p>
            <p class="flex items-center flex-wrap">
              <span class="text-2xl leading-none font-medium text-primary mr-4 mt-2">${{ price }}</span>
            </p>

            <vs-divider v-if=" descriptionAr.length>0" />

            <p>{{ descriptionAr }}</p>
            <p>{{ descriptionEn }}</p>

            <vs-divider />
            <div class="vx-row">
              <div class="vx-col w-full">
                <div class="flex flex-wrap items-start mb-4">
                  <vs-button
                    class="mr-4 mb-4"
                    icon-pack="feather"
                    icon="icon-edit"
                    @click="edited=true"
                  >تعديل</vs-button>

                  <vs-button
                    class="mr-4 mb-4"
                    icon-pack="feather"
                    icon="icon-trash-2"
                    color="danger"
                    @click="deleteCookingTool"
                  >حذف</vs-button>
                  <vs-button
                    class="mb-4"
                    icon-pack="feather"
                    icon="icon-x"
                    color="success"
                    @click=" $router.push({ path: '/cooking-tools' }).catch(err => {});"
                  >إلغاء</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="9" vs-sm="12" v-if="edited">
      <vs-card>
        <div slot="header">
          <h2>تعديل بيانات {{nameAr}}</h2>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
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
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required'"
              name="nameEn"
              label-placeholder="الإسم باللغة الإنجليزية"
              v-model="nameEn"
              class="w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('nameEn')"
            >{{ errors.first('nameEn') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              type="number"
              autocomplete="off"
              v-validate="'required'"
              name="price"
              label-placeholder="الثمن"
              v-model="price"
              class="w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('price')"
            >{{ errors.first('price') }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <template lang="html">
              <div>
                <vs-textarea label="الوصف باللغة العربية" v-model="descriptionAr" />
              </div>
            </template>
            <!-- <vs-textarea height="130px" label="الوصف باللغة العربية" v-model="descriptionAr" /> -->
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <template lang="html">
              <div>
                <vs-textarea label="الوصف باللغة الإنجليزية" v-model="descriptionEn" />
                <!-- height="130px" -->
              </div>
            </template>
          </div>
        </div>

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
                @click="updateCookingTool"
              >تعديل</vs-button>

              <vs-button
                class="mr-4 mb-4"
                icon-pack="feather"
                icon="icon-trash-2"
                color="danger"
                @click="deleteCookingTool"
              >حذف</vs-button>
              <vs-button
                class="mb-4"
                icon-pack="feather"
                icon="icon-x"
                color="success"
                @click="edited=false"
              >إلغاء</vs-button>
            </div>
          </div>
        </div>
        <!-- </form> -->
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
    },
    price: {
      required: "من فضلك حدد الثمن ",
      numeric: "السعر يحتوي علي أرقام فقط"
    }
  }
};

// register custom messages
Validator.localize("ar", dict);
export default {
  data() {
    return {
      edited: false,
      item: null,
      nameAr: "",
      nameEn: "",
      photo: null,
      price: "",
      descriptionAr: "",
      descriptionEn: "",
      url: ""
    };
  },
  created() {
    this.getCookingTool(this.$route.params.id);
  },

  methods: {
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    deleteCookingTool() {
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
                    .delete(`/cookingtools/${this.$route.params.id}`)
                    .then(response => {
                      this.$vs.loading.close();
                      this.$router.push({ path: "/cooking-tools" });

                      this.$vs.notify({
                        title: "حسنا ",
                        text: "تم مسح أداة الطهي  بنجاح",
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
    getCookingTool() {
      if (this.$route.params.id > 0) {
        this.$vs.loading();
        axiosApi
          .get(`/cookingtools/${this.$route.params.id}`)
          .then(res => {
            this.$vs.loading.close();
            this.item = res.data;

            this.nameEn = res.data.nameEn;
            this.nameAr = res.data.nameAr;
            this.descriptionAr = res.data.descriptionAr;
            this.descriptionEn = res.data.descriptionEn;
            this.price = res.data.price;

            this.url = res.data.photo;
            this.photo = res.data.photo;
          })
          .catch(e => {
            this.$vs.loading.close();
          });
      } else {
        this.$router.push({ path: "/cooking-tools" });
      }
    },
    updateCookingTool() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading();
          let form_data = new FormData();
          form_data.append("nameAr", this.nameAr);
          form_data.append("nameEn", this.nameEn);
          form_data.append("descriptionAr", this.descriptionAr);
          form_data.append("descriptionEn", this.descriptionEn);
          form_data.append("price", this.price);
          if (this.photo != null) {
            form_data.append("photo", this.photo);
          }

          axiosApi
            .patch(`/cookingtools/${this.$route.params.id}`, form_data, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              this.$router.push({ path: "/cooking-tools" });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم تعديل بيانات أداة الطهي  بنجاح",
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
.vs-textarea {
  min-height: 120px !important;
}
</style>