<template>
  <div>
    <div v-if="items!=null" class="items-grid-view vx-row match-height" ref="loading" id="loading">
      <div class="vx-col w-full lg:w-1/2 mb-base" v-for="(item,index) in items" :key="index">
        <ordersCard @click="showDetails(item._id)" class="pointer" :item="item"></ordersCard>
      </div>
    </div>
    <!-- v-if="totalPages>1" -->
    <div v-if="totalPages>1" class="vx-col lg:w-1/4 sm:w-1/2 w-full">
      <vs-pagination
        :total="totalPages
        "
        v-model="Current"
        prev-icon="arrow_forward"
        next-icon=" arrow_back"
      ></vs-pagination>
    </div>
    <div class="" v-if="items!=null && items.length==0">
      <div class="vx-row justify-center">
        <div class="vx-col w-full md:w-1/3 mt-10 sm:w-1/2 mb-base">
          <div class="vx-card text-center cursor-pointer">
            <!---->
            <div class="vx-card__collapsible-content vs-con-loading__container">
              <div class="vx-card__body">
                <img
                  src="@/assets/images/notFound.png"
                  alt="graphic"
                  width="180"
                  class="mx-auto mb-4"
                />
                <h4 class="mb-2">لاتوجد طلبات</h4>
                <!-- <small>Muffin lemon drops chocolate carrot cake chocolate bar sweet roll.</small> -->
              </div>
              <!---->
            </div>
            <div class="vx-card__code-container collapsed" style="max-height: 0px; display: none;">
              <div class="code-content">
                <pre class="language-markup"><code class="language-markup"></code></pre>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axiosApi from "../axios";
import ordersCard from "@/components/orderCard.vue";
export default {
  props: ["status"],
  components: {
    ordersCard
  },
  data() {
    return {
      items: null,
      Current: 1,
      totalPages: 1
    };
  },
  created() {
    this.getOrders();
  },
  watch: {
    Current: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getOrders();
      }
    }
  },
  methods: {
    getOrders() {
      this.$vs.loading();
      axiosApi
        .get(`/orders?status=${this.status}&page=${this.Current}`)
        .then(res => {
          this.$vs.loading.close();
          let reslut= res.data
          this.items = reslut.response.data;
          console.log(reslut.response.data)
          this.totalPages = reslut.response.totalPages;
        })
        .catch(e => {
          this.$vs.loading.close();

          console.log(e);
        });
    },
    deletitem(id){
            this.items.splice(this.items.indexOf(this.items.find(o=>o.id==id)), 1);

    },
    showDetails(item_id) {
      console.log(item_id);
      this.$router
        .push({
          name: "edit-orders",
          params: { id: item_id }
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>