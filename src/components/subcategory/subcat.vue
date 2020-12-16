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
        <vs-avatar @click="lanshUpdateDialoage(sub)" :src="sub.photo" />
        {{ sub.name }}
      </vs-chip>
      <vs-button
        @click="activePrompt = true"
        color="success"
        type="flat"
        icon-pack="feather"
        icon="icon-plus"
        class="p-0"
      ></vs-button>
    </div>

    <vs-divider />

    <vs-prompt
      color="danger"
      :buttons-hidden="true"
      title="قسم فرعي"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <vs-input
          autocomplete="off"
          v-validate="'required'"
          name="name"
          label-placeholder="الإسم"
          v-model="subcat.name"
          class="w-full"
        />

        <span class="text-danger text-sm" v-show="errors.has('name')">{{
          errors.first("name")
        }}</span>
        <!-- 
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
              }}</span> -->
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex flex-wrap items-start mb-4">
            <vs-button
              v-if="!updateCategory"
              class="mr-4 mb-4 mt-5"
              icon-pack="feather"
              icon="icon-edit"
              @click="addSubCategory()"
              >اضافة</vs-button
            >
            <vs-button
              v-else
              class="mr-4 mb-4 mt-5"
              icon-pack="feather"
              icon="icon-edit"
              @click="updateSubCategory()"
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
  props: ["id"],
  data() {
    return {
      subcategories: [],
      item: null,
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
    addSubCategory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
            this.subcat.catId=this.id
          this.$vs.loading();
          axiosApi
            .post(`subcategory`, this.subcat)
            .then((response) => {
              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم إضافة القسم الفرعي الجديد بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-check",
              });

              this.activePrompt = false;
              this.item.subcategory.push(response.data);
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
    lanshUpdateDialoage(sub) {
      this.updateCategory = true;
      this.activePrompt = true;
      this.subcat = sub;
    },
    getSubcategories() {
      axiosApi.get(`subcategory/category/${this.id}`).then((response) => {
        console.log(response);
        this.subcategories = response.data.data;
      });
    },
    updateSubCategory() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$vs.loading();

          axiosApi
            .patch(`/subcategory/${this.subcat._id}`, this.subcat)
            .then((response) => {
              this.$vs.loading.close();
              this.activePrompt = false;

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
                  .delete(`/subcategory/${sub._id}`)
                  .then((response) => {
                    this.$vs.loading.close();

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
  },
};
</script>

<style>
</style>