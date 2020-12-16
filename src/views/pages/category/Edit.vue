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
            v-model="name"
            class="w-full"
          />

          <span class="text-danger text-sm" v-show="errors.has('name')">{{
            errors.first("name")
          }}</span>

          <!-- <vs-input
            autocomplete="off"
            v-validate="'required'"
            name="nameEn"
            label-placeholder="الإسم باللغة الإنجليزية"
            v-model="name"
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
                  @click="updateCategory()"
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
  components:{
    subcat
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
                  .delete(`/category/${this.$route.params.id}`)
                  .then((response) => {
                    this.$vs.loading.close();
                    this.$router.push({ path: "/category" });

                    this.$vs.notify({
                      title: "حسنا ",
                      text: "تم مسح القسم  بنجاح",
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
      console.log("sadas");
      this.$vs.loading();
      axiosApi
        .get(`/category/${this.$route.params.id}`)
        .then((res) => {
          this.$vs.loading.close();
          console.log(res);

          this.item = res.data.data;
          this.name = this.item.name;
        })
        .catch((e) => {
          console.log(e);
          this.$vs.loading.close();
          // this.$router.push({ path: "/category" });
        });
    },
    updateCategory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$vs.loading();
          let sub = {};
          sub.name = this.name;

          axiosApi
            .patch(`/category/${this.$route.params.id}`, sub)
            .then((response) => {
              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم تعديل بيانات القسم  بنجاح",
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