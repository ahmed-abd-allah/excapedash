<template>
  <vs-row vs-justify="center">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="9"
      vs-sm="12"
      v-if="product != null"
    >
      <vs-card>
        <div slot="header" class>
          <h2 class="text-white">تعديل</h2>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <h6>اختر نوع الخدمة</h6>
            <v-select
              name="area"
              v-validate="'required'"
              v-model="category"
              label="nameAr"
              :options="categories"
            ></v-select>
            <span class="text-danger text-sm" v-show="errors.has('area')">{{
              errors.first("area")
            }}</span>
          </div>
          <div
            v-if="subCategories != null"
            class="vx-col sm:w-1/3 w-full sm:w-1/3 mb-2"
          >
            <h6>اختر الخدمة الفرعية</h6>
            <v-select
              name="cluster"
              v-validate="'required'"
              v-model="subCategory"
              label="nameAr"
              :options="subCategories"
            ></v-select>
            <span class="text-danger text-sm" v-show="errors.has('cluster')">{{
              errors.first("cluster")
            }}</span>
          </div>
          <div class="w-full mt-5"></div>
          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="name"
            label-placeholder="الإسم باللغة العربية"
            v-model="product.nameAr"
            class="w-full sm:w-1/3 m-2"
          />

          <span class="text-danger text-sm" v-show="errors.has('name')">{{
            errors.first("name")
          }}</span>

          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="nameEn"
            label-placeholder="الإسم باللغة الإنجليزية"
            v-model="product.nameEn"
            class="w-full sm:w-1/3 m-2"
          />
          <span class="text-danger text-sm" v-show="errors.has('nameEn')">{{
            errors.first("nameEn")
          }}</span>
          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="link"
            label-placeholder="رابط المشروع "
            v-model="product.link"
            class="w-full sm:w-1/3 m-2"
          />
          <span class="text-danger text-sm" v-show="errors.has('link')">{{
            errors.first("link")
          }}</span>
          <div class="w-full"></div>
          <div class="w-full sm:w-1/3 m-2">
            <div class="vs-row">
              <vs-textarea
                autocomplete="off"
                name="descAr"
                placeholder="الوصف باللغة العربية"
                v-model="product.descAr"
                class="w-full"
              />
              <span class="text-danger text-sm" v-show="errors.has('descAr')">{{
                errors.first("descAr")
              }}</span>
            </div>
          </div>

          <div class="w-full sm:w-1/3 m-2">
            <div class="vs-row">
              <vs-textarea
                autocomplete="off"
                name="descEn"
                placeholder="الوصف باللغة الإنجليزية"
                v-model="product.descEn"
                class="w-full"
              />
              <span class="text-danger text-sm" v-show="errors.has('descEn')">{{
                errors.first("descEn")
              }}</span>
            </div>
          </div>
        </div>
        <div class="con-img-upload">
          <div class="con-input-upload">
            <input name="photo" type="file" @change="fileSelected" />
            <span class="text-input">حدد صورة المنتج</span>
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
            <img
              :src="product.image"
              style="max-width: 100%; max-height: 80%"
            />
          </div>
        </div>
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
                @click="deleteProduct"
                >حذف</vs-button
              >
              <vs-button
                class="mb-4"
                icon-pack="feather"
                icon="icon-x"
                color="success"
                @click="$router.push({ path: '/products' }).catch((err) => {})"
                >إلغاء</vs-button
              >
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
    price: {
      required: "من فضلك حدد الثمن ",
      numeric: "السعر يحتوي علي أرقام فقط",
    },
    nameAr: {
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
  data() {
    return {
      subCategory: null,
      category: null,
      product: null,
      photo: null,
      categories: [],
      subCategories: null,
      url: "",
    };
  },
  created() {
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      this.getProuct(this.$route.params.id);
    } else {
      this.$router.push({ path: "/products" });
    }
  },
  watch: {
    category(newC, oldC) {
      if (newC != oldC) {
        this.getSubcategories(this.category._id);
      }
    },
  },
  methods: {
    fileSelected(e) {
      this.product.image = "";
      this.photo = e.target.files[0];
      this.product.image = URL.createObjectURL(this.photo);
    },
    async uploadImage() {
      if (
        this.photo != null &&
        !this.product.image.includes("res.cloudinary.com")
      ) {
        this.$vs.loading();

        let form_data = new FormData();
        form_data.append("image", this.photo);
        await axiosApi
          .post(`/resourses/image`, form_data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            this.product.image = response.data.url;
            console.log(response);
            this.updateProduct();
          })
          .catch((e) => {
            this.$vs.loading();

            console.log(e);
          });
      } else if (
        this.photo == null &&
        this.product.image.includes("res.cloudinary.com")
      ) {
        this.$vs.loading();

        this.updateProduct();
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
    updateProduct() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.product.serviceId = this.category._id;
          this.product.subServiceId = this.subCategory._id;
          axiosApi
            .patch(`/works/${this.product._id}`, this.product)
            .then((response) => {
              this.$router.push({ path: `/products` });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم التعديل    ",
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
          this.$vs.loading();

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
    deleteProduct() {
      this.$snotify.confirm(
        "في حالة مسح المنتج  لا يمكنك إسترجاعه مرة أخري",
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
                  .delete(`/works/${this.$route.params.id}`)
                  .then((response) => {
                    this.$vs.loading.close();
                    this.$router.push({ path: "/products" });

                    this.$vs.notify({
                      title: "حسنا ",
                      text: "تم مسح المنتج  بنجاح",
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
    async getProuct() {
      this.$vs.loading();
      await axiosApi
        .get(`/works/${this.$route.params.id}`)
        .then((res) => {
          this.$vs.loading.close();
          this.product = res.data.data;

          this.getcategories();
          this.getSubcategories((this.product&&this.product.serviceId)._id);
        })
        .catch((e) => {
          this.$vs.loading.close();
        });
    },
    getSubcategories(id) {
      this.$vs.loading();

      console.log(id);
      axiosApi.get(`subservice/service/${id}`).then((response) => {
        console.log(response.data.data);
        this.subCategories = response.data.data;
        this.subCategory =
          this.subCategories.find((e) => e._id == (this.product&&this.product.subServiceId)._id) ||
          null;
        this.$vs.loading.close();
      });
    },

    getcategories() {
      this.$vs.loading();
      axiosApi
        .get(`service`)
        .then((response) => {
          this.categories = response.data.data;
          this.category = this.categories.find(
            (e) => e._id == (this.product&&this.product.serviceId)._id
          );

          this.$vs.loading.close();
        })
        .catch((e) => {
          this.$vs.loading.close();

          console.log(e);
        });
    },
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>