<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12">
      <vs-card>
        <div slot="header">
          <h2 class="text-white">إضافة قسم جديد </h2>
        </div>
        <div id="div-with-loading">
          <!-- <form> -->
          <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="nameAr"
            label-placeholder="الإسم باللغة العربية"
            v-model="category.name"
            class="w-full"
          />

          <span
            class="text-danger text-sm"
            v-show="errors.has('nameAr')"
          >{{ errors.first('nameAr') }}</span>
<!-- 
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
          >{{ errors.first('nameEn') }}</span> -->
          <!-- <label for="myfile">Select a file:</label> -->
          <!-- <div class="con-img-upload">
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
          </div> -->

          <div class="flex flex-wrap justify-between my-5">
            <vs-button class="float-right" @click="addCategory">
              <h3>إضافة</h3>
            </vs-button>
          </div>
          <!-- </form> -->
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
    category:{
    name: ""

    }
     
     
    };
  },
  methods: {
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    addCategory() {
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
            .post("/category", this.category)
            .then(response => {
              this.$router.push({ path: "/category" });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم إضافة القسم الجديد بنجاح",
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