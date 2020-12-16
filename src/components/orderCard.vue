<template>
  <div @click="showDetails(item._id)" class="vx-card cursor-pointer">
    <div class="vx-card__header">
      <div class="vx-card__title">
        <div class="vx-row">
            <vs-avatar class="user-profile-img" :src="item.user.photo" size="85px" />
          <div class="vx-col">
            <h4 class>{{item.user.name}}</h4>
            <h6 class style="color: rgb(184, 194, 204);">{{item.user.email}}</h6>
          </div>
        </div>
      </div>
      <div class="vx-card__actions">
        <vs-chip color="success">{{item.id}}</vs-chip>
      </div>
    </div>
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__body">
        <div class="vx-row w-full">
          <p class="p-3">المنتجات</p>
        </div>
        <div class="vx-row p-3 pt-0">
          <!-- <img
                v-for="(it ,index) in item.items" :key="index"
                :alt="(it.product && it.product.name)"
                :src="(it.product && it.product.photo)"
                class="responsive rounded-sm card-img img-fluid m-1 sm:w-1/4 "
          />-->
          <vs-chip
            v-for="(it ,index) in item.products"
            :key="index"
            color="#24c1a0"
            close-icon="close"
          >
            <vs-avatar
              size="40px"
              :alt="(it.product && it.product.name)"
              :src="(it.product && it.product.image)"
            />
            {{(it.product && it.product.name)}}
          </vs-chip>
        </div>
        <div class="vx-row p-3 pt-1">
          <div class="w-full">
            <p class>الملاحظات</p>
          </div>
          <p class="font-medium-2 mb-0">{{item.notes}}</p>
        </div>
        <div class="d-flex w-full justify-content-between mt-2">
          <div class="float-left">
            <p class>تاريخ الطلب</p>

            <p class="font-medium-2 mb-0">
              {{$moment(item.createdAt).format('LLLL')}}
              <vs-icon icon="access_time"></vs-icon>
            </p>
          </div>
          <div class="float-right">
            <p class>السعر</p>

            <p class="font-medium-2 mb-0">${{item.totalPrice}}</p>
          </div>
        </div>
        <div class="vx-row w-full p-3">
          <p class="font-medium-2 mb-0 pr-3">نوع التوصيل</p>

          <vs-chip v-if="item.deliveryType=='home'" color="primary">
            <vs-avatar icon="house" />التوصيل في المخزن
          </vs-chip>
        </div>
      </div>
      <!---->
    </div>

    <div class="vx-row flex justify-center flex-wrap m-0">
      <vs-button
        @click.stop="changeStatus('accepted')"
        v-if="item.status=='pending'"
        color="success"
        class="m-1"
        type="border"
      >قبول</vs-button>
      <vs-button
        @click.stop="changeStatus('rejected')"
        v-if="item.status=='pending'"
        color="danger"
        class="m-1"
        type="border"
      >رفض</vs-button>
      <vs-button
        @click.stop="changeStatus('ready')"
        v-if="item.status=='accepted'"
        color="success"
        class="m-1"
        type="border"
      >جاهز</vs-button>
      <vs-button
        @click.stop="changeStatus('onTheWay')"
        v-if="item.status=='ready'"
        color="danger"
        class="m-1"
        type="border"
      >قيد التوصيل</vs-button>
      <vs-button
        @click.stop="changeStatus('delivered')"
        v-if="item.status=='onTheWay'"
        color="danger"
        class="m-1"
        type="border"
      >تم التوصيل</vs-button>
    </div>
  </div>
</template>

<script>
import axiosApi from "../axios";

export default {
  props: ["item"],

  methods: {
    showDetails(item_id) {
      console.log(item_id);
      this.$router
        .push({
          name: "edit-orders",
          params: { id: item_id }
        })
        .catch(() => {});
    },
    changeStatus(status) {
      this.$snotify.confirm(" تغيير حالة الطلب   ", "هل أنت متأكد ؟", {
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          {
            text: "موافق",
            action: toast => {
              axiosApi
                .patch(`/orders/${this.item._id}`, {
                  status: status
                })
                .then(response => {
                  this.$vs.loading.close();
                  this.$parent.deletitem(this.item._id);
                  this.$snotify.remove(toast.id);

                  this.$vs.notify({
                    title: "حسنا ",
                    text: "تم تغيير   الحالة   بنجاح",
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
                    text: "حدث خطئ تاكد من اتصال بالانترنت ",
                    color: "warning",
                    iconPack: "feather",
                    position: "top-right",
                    icon: "icon-alert-circle"
                  });
                  console.log(e);
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
      });
    }
  }
};
</script>
<style>
</style>