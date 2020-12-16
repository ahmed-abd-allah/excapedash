<template>
  <div>
    <div class="items-grid-view vx-row match-height" ref="loading" id="loading">
      <div class="vx-col lg:w-1/4 sm:w-1/2 w-full" v-for="(item,index) in items" :key="index">
        <item-grid-view :item="item" url="edit-category">
          <!-- SLOT: ACTION BUTTONS -->
          <template slot="action-buttons">
            <div class="flex flex-wrap">
              <div
                class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                @click="showDetails(item._id)"
              >
                <feather-icon icon="EyeIcon" svgClasses="h-4 w-4" />

                <span class="text-lg font-semibold ml-2" @click="showDetails(item._id)">عرض التفاصيل</span>
              </div>
            </div>
          </template>
        </item-grid-view>
      </div>
    </div>
  </div>
</template>

<script>
import axiosApi from "../../../axios";

export default {
  components: {
    ItemGridView: () => import("../../../components/ItemGridView")
  },
  data() {
    return {
      items: null
    };
  },
  created() {
    this.getCategories();
  },

  methods: {
    getCategories() {
      this.$vs.loading();
      axiosApi
        .get(`/service`)
        .then(res => {
          this.$vs.loading.close();
          this.items = res.data.data;
          console.log(this.items)
        })
        .catch(e => {
          this.$vs.loading.close();

          console.log(e);
        });
    },
    showDetails(item_id) {
      console.log(item_id);
      this.$router
        .push({
          name: "edit-category",
          params: { id: item_id }
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>