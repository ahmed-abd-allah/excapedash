<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="9" vs-sm="12">
      <vs-card>
        <div slot="header">
          <h2>إضافة أداة طهي جديدة</h2>
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
            <vs-textarea label="الوصف باللغة العربية" v-model="descriptionAr" />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-textarea label="الوصف باللغة الإنجليزية" v-model="descriptionEn" />
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

        <div class="flex flex-wrap justify-between my-5">
          <vs-button class="float-right" @click="addCookingTool">
            <h3>إضافة</h3>
          </vs-button>
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
      nameAr: "",
      nameEn: "",
      price: "",
      descriptionAr: "",
      descriptionEn: "",
      photo: null,
      url: ""
    };
  },
  methods: {
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    addCookingTool() {
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
            .post("/cookingtools", form_data, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              this.$router.push({ path: "/cooking-tools" });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم إضافة الأداةالطهي الجديدة بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-right",
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