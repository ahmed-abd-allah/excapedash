<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="9" vs-sm="12">
      <vs-card>
        <div slot="header" class>
          <h2 class="text-white">إضافة</h2>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required'"
              name="name"
              label-placeholder="الإسم"
              v-model="name"
              class="w-full"
            />

            <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required|email'"
              name="email"
              label-placeholder="البريد الاليكتروني"
              v-model="email"
              class="w-full"
            />

            <span
              class="text-danger text-sm"
              v-show="errors.has('email')"
            >{{ errors.first('email') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              autocomplete="off"
              v-validate="'required|numeric'"
              name="phone"
              label-placeholder="رقم الهاتف "
              v-model="phone"
              class="w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('phone')"
            >{{ errors.first('phone') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              type="password"
              autocomplete="off"
              v-validate="'required'"
              name="password"
              label-placeholder="كلمه المرور"
              v-model="password"
              class="w-full"
              ref="password"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('password')"
            >{{ errors.first('password') }}</span>
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              type="password"
              autocomplete="off"
              v-validate="'required|confirmed:password'"
              name="confpassword"
              label-placeholder="تاكيد كلمه المرور "
              v-model="confpassword"
              class="w-full"
              data-vv-as="password"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('confpassword')"
            >{{ errors.first('confpassword') }}</span>
          </div>
          <!--  -->
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-row vs-align="center" vs-type="flex" vs-justify="center" class="mt-5" vs-w="12">
              <div class>
                <vs-radio v-model="gender" vs-name="gender" vs-value="male">ذكر</vs-radio>
              </div>
              <div>
                <vs-radio v-model="gender" vs-name="gender" vs-value="female">انثي</vs-radio>
              </div>
            </vs-row>
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <!-- <h5 class="text-bold-300">تاريخ الميلاد</h5> -->
            <datepicker
              placeholder="تاريخ الميلاد "
              name="birthDate"
              v-validate="'required'"
              class="mt-5"
              v-model="birthDate"
            ></datepicker>

            <span
              class="text-danger text-sm"
              v-show="errors.has('birthDate')"
            >{{ errors.first('birthDate') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              type="text"
              autocomplete="off"
              v-validate="'required'"
              name="address"
              label-placeholder="العنوان"
              v-model="address"
              class="w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('address')"
            >{{ errors.first('address') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <h6>اختر المنطقة</h6>
            <v-select
              name="area"
              v-validate="'required'"
              v-model="area"
              label="nameAr"
              :options="areas"
            ></v-select>
            <span class="text-danger text-sm" v-show="errors.has('area')">{{ errors.first('area') }}</span>
          </div>
          <div v-if="area!=null" class="vx-col sm:w-1/3 w-full mb-2">
            <h6>اختر القطاع</h6>
            <v-select
              name="cluster"
              v-validate="'required'"
              v-model="cluster"
              label="name"
              :options="area.clusters"
            ></v-select>
            <span
              class="text-danger text-sm"
              v-show="errors.has('cluster')"
            >{{ errors.first('cluster') }}</span>
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
          <vs-button class="float-right" @click="addUser">
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

import axiosApi from "../axios";
import { Validator } from "vee-validate";
const dict = {
  messages: {
    required: () => "هذا الحقل مطلوب"
  },
  custom: {
    name: {
      required: "  من فضلك حدد الإسم باللغة العربية"
    },
    email: {
      required: "من فضلك ادخل البريد الالكتروني  ",
      email: "البريد الاليكتروني غير صحيح"
    },
    phone: {
      required: "من فضلك ادخل الرقم ",
      numeric: "رقم الهاتف  يحتوي علي أرقام فقط"
    },
    password: {
      required: "من فضلك ادخل كلمة المرور  "
    },
    confpassword: {
      required: "من فضلك ادخل كلمة المرور  ",
      confirmed: "كلمة المرور غير متطابقة"
    }
  }
};

// register custom messages
Validator.localize("ar", dict);
export default {
  props: ["role"],
  components: {
    Datepicker
  },
  data() {
    return {
      cluster: null,
      area: null,
      name: "",
      birthDate: "",
      email: "",
      phone: "",
      password: "",
      gender: "male",
      confpassword: "",
      photo: null,
      areas: [],
      address: "",
      url: "",
    //   role: "pharmacy"
    };
  },
  created() {
    this.getAria();
  },
  methods: {
    getAria() {
      this.$vs.loading();

      axiosApi
        .get(`areas`)
        .then(response => {
          this.areas = response.data;
          this.$vs.loading.close();
        })
        .catch(e => {
          this.$vs.loading.close();

          console.log(e);
        });
    },
    fileSelected(e) {
      this.url = "";
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },

    addUser() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading();
          let form_data = new FormData();
          form_data.append("name", this.name);
          form_data.append("phone", this.phone);
          form_data.append(
            "birthDate",
            this.$moment(this.birthDate).format("YYYY-MM-DD")
          );
          form_data.append("email", this.email);
          form_data.append("password", this.password);
          form_data.append("gender", this.gender);
          form_data.append("address", this.address);
          // form_data.append("area", this.area.id);
          form_data.append("cluster", this.cluster.id);
          form_data.append("role", this.role);
          if (this.photo != null) {
            form_data.append("photo", this.photo);
          }
          axiosApi
            .post("/signup", form_data, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              this.$router.push({ path: `/${this.role}` });

              this.$vs.loading.close();

              this.$vs.notify({
                title: "حسنا ",
                text: "تم إضافة صيدالية  الجديدة بنجاح",
                color: "success",
                iconPack: "feather",
                position: "top-right",
                icon: "icon-check"
              });
            })
            .catch(e => {
              this.$vs.loading.close();
            //   console.log(e);
              this.$vs.notify({
                title: "ًعفوا",
                text: "قد يكون هذا البريد  الالكتروني او رقم الهاتف مستخخدم من قبل ",
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