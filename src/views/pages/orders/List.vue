<template>
  <div>
    <div class="items-grid-view vx-row match-height" ref="loading" id="loading">
      <div class="vx-col w-full mb-2">
        <h3>الطلبات</h3>
      </div>
      
      <vs-tabs  :color="colorx" alignment="center">
          <vs-tab @click="colorx = 'warning'" label="قيد الانتظار" icon="hourglass_empty">
          <orderStatusList status="pending"></orderStatusList>
        </vs-tab>
        <vs-tab @click="colorx = 'success'" label="تم القبول" icon="done">
          <orderStatusList status="accepted"></orderStatusList>
        </vs-tab>
        <vs-tab @click="colorx = 'danger'" label="تم الرفض " icon="highlight_off">
          <orderStatusList status="rejected"></orderStatusList>
        </vs-tab>
        <vs-tab label="جاهز" icon="done_all">
          <orderStatusList status="ready"></orderStatusList>
        </vs-tab>
        <vs-tab @click="colorx = 'success'" label="قيد التوصيل " icon="local_shipping">
          <orderStatusList status="onTheWay"></orderStatusList>
        </vs-tab>
          <vs-tab @click="colorx = 'success'" label="تم التوصيل " icon="spellcheck">
          <orderStatusList status="delivered"></orderStatusList>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
import ordersCard from "@/components/orderCard.vue";
import orderStatusList from "@/components/orderStatusList.vue";
export default {
  components: {
    orderStatusList,
    ordersCard
  }
  ,
  data(){
    return{
          colorx:'warning'

    }
  }
};
</script>

<style>
</style>