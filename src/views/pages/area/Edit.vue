<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" v-if="item">
      <vs-card>
        <div slot="header">
          <h2 class="text-white">تعديل منطقة {{nameAr}}</h2>
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
          <!-- <label for="myfile">Select a file:</label> -->
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
          <div class="centerx">
            <h3>القطاعات</h3>
            <!-- @click="deleteSubArea(sub)" close-icon="close" -->
            <vs-chip    v-for="(sub, index) in item.clusters" :key="index" color="warning"  >
              <vs-avatar @click="lanshUpdateDialoage(sub)" :src="sub.photo" />
              {{sub.name}}
                    

            </vs-chip>
            <vs-button @click="activePrompt = true" color="success" type="flat" icon-pack="feather" icon="icon-plus" class="p-0"></vs-button>


          </div>

          <vs-divider />
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="flex flex-wrap items-start mb-4">
                <vs-button
                  class="mr-4 mb-4"
                  icon-pack="feather"
                  icon="icon-edit"
                  @click="updateِArea()"
                >تعديل</vs-button>
<!-- 
                <vs-button
                  class="mr-4 mb-4"
                  icon-pack="feather"
                  icon="icon-trash-2"
                  color="danger"
                  @click="deleteArea"
                >حذف</vs-button> -->
                <vs-button
                  class="mb-4"
                  icon-pack="feather"
                  icon="icon-x"
                  color="success"
                  @click=" $router.push({ path: '/area' }).catch(err => {});"
                >إلغاء</vs-button>
              </div>
            </div>
          </div>
          <vs-prompt
            color="danger"
            :buttons-hidden="true"
            title="قطاع"
            :active.sync="activePrompt"
          >
            <div class="con-exemple-prompt">
              <vs-input
                autocomplete="off"
                v-validate="'required'"
                name="nameAr"
                label-placeholder="الإسم باللغة العربية"
                v-model="cluster.name"
                class="w-full"
              />

              <span
                class="text-danger text-sm"
                v-show="errors.has('nameAr')"
              >{{ errors.first('nameAr') }}</span>
            </div>
          <div class="con-img-upload">
            <div class="con-input-upload">
              <input name="photo" type="file" @change="fileSelectedCluster" />
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
              <img :src="clusterurl" style="max-width: 100%; max-height: 80%;" />
            </div>
          </div>
 
            <div class="vx-row">
              <div class="vx-col w-full">
                <div class="flex flex-wrap items-start mb-4">
                  <vs-button
                    v-if="!updateCluster1"
                    class="mr-4 mb-4 mt-5"
                    icon-pack="feather"
                    icon="icon-edit"
                    @click="addCluster()"
                  >اضافة</vs-button>
                  <vs-button
                    v-else
                    class="mr-4 mb-4 mt-5"
                    icon-pack="feather"
                    icon="icon-edit"
                    @click="updateSubArea()"
                  >تعديل</vs-button>
                </div>
              </div>
            </div>
          </vs-prompt>
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
      url: "",
      activePrompt: false,    
      updateCluster1: false,
      clusterurl:"",
      cluster: {
        name: "",
        photo1: null,
      }
    };
  },
  created() {
    this.getAreas();
  },

  methods: {
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    fileSelectedCluster(e) {
      this.clusterurl = "";
      this.cluster.photo1 = e.target.files[0];
      this.clusterurl = URL.createObjectURL(this.cluster.photo1);
    },
    deleteArea() {
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
                    .delete(`/categories/${this.$route.params.id}`)
                    .then(response => {
                      this.$vs.loading.close();
                      this.$router.push({ path: "/Area" });

                      this.$vs.notify({
                        title: "حسنا ",
                        text: "تم مسح القسم  بنجاح",
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
    getAreas() {
      if (this.$route.params.id > 0) {
        this.$vs.loading();
        axiosApi
          .get(`/areas/`)
          .then(res => {
            this.$vs.loading.close();
            this.item = res.data.find(o=>o.id===this.$route.params.id);
            this.nameEn = this.item.nameEn;
            this.nameAr = this.item.nameAr;
            this.url =this.item.photo;
          })
          .catch(e => {
            this.$vs.loading.close();
          });
      } else {
        this.$router.push({ path: "/area" });
      }
    },
    updateِArea() {
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
            .patch(`/areas/${this.$route.params.id}`, form_data, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              // this.$router.push({ path: "/Area" });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم تعديل بيانات المنطقة   بنجاح",
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
    },
    //! sub catigories functions 
    addCluster() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading();
          let form_data = new FormData();
          form_data.append("name",  this.cluster.name);
          if ( this.cluster.photo1 != null) {
            form_data.append("photo",  this.cluster.photo1);
          }
          axiosApi
            .post(`/areas/${this.$route.params.id}/clusters`, form_data, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم إضافة  القطاع بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-check"
              });

                    this.activePrompt = false;
                    this.item.clusters.push(response.data)

            })
            .catch(e => {
              this.$vs.loading.close();
                    this.activePrompt = false;

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
    },
    lanshUpdateDialoage(sub) {
      this.updateCluster1 = true;
      this.activePrompt = true;
      this.cluster = sub;
      this.clusterurl=sub.photo
    },
    updateSubArea() {
     this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading();
          let form_data = new FormData();
          form_data.append("name",  this.cluster.name);
          form_data.append("area",  this.cluster.area);
          if ( this.cluster.photo1 != null) {
            form_data.append("photo",  this.cluster.photo1);
          }
          axiosApi
            .patch(`/clusters/${this.cluster.id}`, form_data, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم تعديل  القطاع بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-check"
              });
              this.cluster=response.data
              this.item.clusters[this.item.clusters.indexOf(this.item.clusters.find(o=>o.id==this.cluster.id))]=this.cluster
              this.activePrompt = false;
              this.updateCluster1 = false;

              this.cluster={
                name:"",
                photo:""
              }
            })
            .catch(e => {
              this.$vs.loading.close();
                    this.activePrompt = false;

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
    ,
    deleteSubArea(sub) {
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
                    .delete(`/sub-categories/${sub.id}`)
                    .then(response => {
                      this.$vs.loading.close();
                      this.$router.push({ path: "/Area" });

                      this.$vs.notify({
                        title: "حسنا ",
                        text: "تم مسح القسم  بنجاح",
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
    }
  }
};
</script>

<style>
</style>