<template>
  <vs-row vs-justify="center">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="9"
      vs-sm="12"
    >
      <vs-card>
        <div slot="header" class>
          <h2 class="text-white">إضافة</h2>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>اختر القسم</h6>
            <v-select
              name="area"
              v-validate="'required'"
              v-model="category"
              label="name"
              :options="categories"
            ></v-select>
            <span class="text-danger text-sm" v-show="errors.has('area')">{{
              errors.first("area")
            }}</span>
          </div>
          <div v-if="subCategories != null" class="vx-col sm:w-1/3 w-full mb-2">
            <h6>اختر القسم الفرعي</h6>
            <v-select
              name="cluster"
              v-validate="'required'"
              v-model="subCategory"
              label="name"
              :options="subCategories"
            ></v-select>
            <span class="text-danger text-sm" v-show="errors.has('cluster')">{{
              errors.first("cluster")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2"></div>
          <div class="vx-col w-full mb-2"></div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required'"
              name="name"
              label-placeholder="الإسم"
              v-model="product.name"
              class="w-full"
            />

            <span class="text-danger text-sm" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required'"
              name="color"
              label-placeholder="اللون"
              v-model="product.color"
              class="w-full"
            />

            <span class="text-danger text-sm" v-show="errors.has('color')">{{
              errors.first("color")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required|numeric'"
              name="itemPrice"
              label-placeholder="السعر "
              v-model="product.price"
              class="w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('itemPrice')"
              >{{ errors.first("itemPrice") }}</span
            >
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required|numeric'"
              name="quantity"
              label-placeholder="الكميه "
              v-model="product.quantity"
              class="w-full"
            />
            <span class="text-danger text-sm" v-show="errors.has('quantity')">{{
              errors.first("quantity")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required|numeric'"
              name="tax"
              label-placeholder="الضريبة "
              v-model="product.tax"
              class="w-full"
            />
            <span class="text-danger text-sm" v-show="errors.has('tax')">{{
              errors.first("tax")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/6 w-full d-flex align-items-bottom">
            <div class="vs-row">
              <span> متاح في المخزن </span>
              <vs-switch color="success" v-model="product.available">
              </vs-switch>
            </div>
          </div>

          <div class="vx-col w-full mb-2"></div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-textarea
              autocomplete="off"
              v-validate="'required'"
              name="description"
              label="الوصف "
              v-model="product.desc"
              class="w-full"
            />

            <span
              class="text-danger text-sm"
              v-show="errors.has('description')"
              >{{ errors.first("description") }}</span
            >
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
      product: {
        available: true,
      },
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
  created() {
    this.getcategories();
  },
  watch: {
    category(newC, oldC) {
      if (newC != oldC) {
        this.getSubcategories(this.category._id);
      }
    },
  },
  methods: {
    getSubcategories(id) {
      this.$vs.loading();

      console.log(id);
      axiosApi.get(`subcategory/category/${id}`).then((response) => {
        console.log(response.data.data);
        this.subCategories = response.data.data;
        this.$vs.loading.close();
      });
    },
    getcategories() {
      this.$vs.loading();

      axiosApi
        .get(`category`)
        .then((response) => {
          this.categories = response.data.data;
          this.$vs.loading.close();
        })
        .catch((e) => {
          this.$vs.loading.close();

          console.log(e);
        });
    },
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
            this.product.image = response.data.url;
            console.log(response);
            this.addProduct();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
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
    addProduct() {
      this.$validator.validateAll().then((result) => {
        if (result && this.photo != null) {
          this.product.catId = this.category._id;
          this.product.subCatId = this.subCategory._id;
          axiosApi
            .post(`/products`, this.product)
            .then((response) => {
              this.$router.push({ path: `/products` });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم إضافة المنتج   بنجاح",
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