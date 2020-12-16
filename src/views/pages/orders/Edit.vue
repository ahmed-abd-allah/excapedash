<template>
  <div v-if="item != null" class="vx-card cursor-pointer">
    <div class="vx-card__header">
      <div class="vx-card__title">
        <div class="vx-row">
          <vs-avatar :src="item.user.photo" />
          <div class="vx-col">
            <h4 class>{{ item.user.name }}</h4>
            <h6 class style="color: rgb(184, 194, 204)">
              {{ item.user.email }}
            </h6>
          </div>
        </div>
      </div>
      <div class="vx-card__actions">
        <!-- <vs-chip color="success">{{ item._id }}</vs-chip> -->
      </div>
    </div>
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__body">
        <div class="vx-row w-full">
          <p class="p-3">المنتجات</p>
        </div>
        <div class="vx-row p-3 pt-0">
          <div
            class="items-list-view"
            v-for="(it, index) in item.products"
            :key="index"
          >
            <item-list-view :item="it.product" :q="it.quantity" class="mb-base">
              <!-- SLOT: ITEM META -->
              <template slot="item-meta">
                <h6
                  class="item-name font-semibold mb-1 cursor-pointer hover:text-primary"
                >
                  {{ it.product.name }}
                </h6>
                <p class="text-sm mb-2">الوصف<br><span class="font-semibold cursor-pointer">{{ it.product.desc  }}</span></p>
                <!-- <p class="text-success text-sm">In Stock</p> -->

                <p class="mt-4 font-bold text-sm">الكمية</p>
                <vs-input-number
                  min="1"
                  max="10"
                  :value="it.quantity"
                  disabled
                  class="inline-flex"
                />

                <p class="font-medium text-grey mt-4">
                  تاريخ الطلب {{ $moment(item.entered_at).format("LLLL") }}
                </p>
                <!-- <p class="text-success font-medium">{{ item.discount_in_percentage }}% off {{ item.offers_count }} offers Available</p> -->
              </template>
            </item-list-view>
          </div>
          <vs-chip
          
            color="#24c1a0"
            close-icon="close"
          >
          اجمالي السعر 
            {{  item.totalPrice}}$
          </vs-chip>
        </div>
        <div class="vx-row p-3 pt-1">
          <div class="w-full">
            <!-- <p class>الملاحظات</p> -->
          </div>
          <p class="font-medium-2 mb-0">{{ item.notes }}</p>
        </div>

      </div>
      <!---->
    </div>

    <div class="vx-row flex justify-center flex-wrap m-0">
      <vs-button
        @click.stop="changeStatus('accepted')"
        :disabled="!(item.status == 'pending')"
        color="success"
        class="m-1"
        type="border"
        >قبول</vs-button
      >
      <vs-button
        @click.stop="changeStatus('rejected')"
        :disabled="!(item.status == 'pending')"
        color="danger"
        class="m-1"
        type="border"
        >رفض</vs-button
      >
      <vs-button
        @click.stop="changeStatus('ready')"
        :disabled="!(item.status == 'accepted')"
        color="success"
        class="m-1"
        type="border"
        >جاهز</vs-button
      >
      <vs-button
        @click.stop="changeStatus('onTheWay')"
        :disabled="!(item.status == 'ready')"
        color="danger"
        class="m-1"
        type="border"
        >قيد التوصيل</vs-button
      >
      <vs-button
        @click.stop="changeStatus('delivered')"
        :disabled="!(item.status == 'onTheWay')"
        color="danger"
        class="m-1"
        type="border"
        >تم التوصيل</vs-button
      >
    </div>
  </div>
</template>

<script>
import axiosApi from "../../../axios";
import ordersApi from "@/apiServices/ordersApi";
const ItemListView = () => import("@/components/ItemListView.vue");

export default {
  data() {
    return {
      item: null,
    };
  },
  components: {
    ItemListView,
  },
  created() {
    this.getOrder();
  },

  methods: {
    getOrder() {
      this.$vs.loading();

      ordersApi
        .getOrder(this.$route.params.id)
        .then((item) => {
          this.item = item.data;
          this.$vs.loading.close();
        })
        .catch((error) => {
          this.$vs.loading.close();
        });
    },
    changeStatus(status) {
      this.$snotify.confirm(" تغيير حالة الطلب   ", "هل أنت متأكد ؟", {
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          {
            text: "موافق",
            action: (toast) => {
              ordersApi
                .changeStatus(status, this.$route.params.id)
                .then((response) => {
                  // this.$snotify.remove(toast.id);

                  this.$vs.notify({
                    title: "حسنا ",
                    text: "تم تغيير   الحالة   بنجاح",
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
      });
    },
  },
};
</script>
<style>
.vs-avatar--count.badgeNumber {
  font-size: 15px;
  padding: 5px;
}
</style>