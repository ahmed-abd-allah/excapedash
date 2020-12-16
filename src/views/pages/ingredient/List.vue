<template>
  <div>
    <div class="items-grid-view vx-row match-height" ref="loading" id="loading">
      <div class="vx-col lg:w-1/4 sm:w-1/2 w-full" v-for="item in items" :key="item.id">
        <item-grid-view :item="item" url="edit-ingredient">
          <!-- SLOT: ACTION BUTTONS -->
          <template slot="action-buttons">
            <div class="flex flex-wrap">
              <div
                class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                @click="showDetails(item)"
              >
                <feather-icon icon="EyeIcon" svgClasses="h-4 w-4" />

                <span class="text-lg font-semibold ml-2" @click="showDetails(item.id)">عرض التفاصيل</span>
              </div>
            </div>
          </template>
        </item-grid-view>
      </div>
    </div>

    <vs-row
      vs-align="center"
      vs-type="flex"
      vs-justify="space-around"
      vs-w="12"
      v-if="items!=null&&totalPages>1"
    >
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <vs-pagination :total="totalPages" v-model="currentPage"></vs-pagination>
      </vs-col>
    </vs-row>
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
      items: null,
      totalPages: 1,
      currentPage: 1,
      limit: 20
    };
  },
  created() {
    this.getIngredients();
  },
  watch: {
    currentPage: function(val, oldVal) {
      console.log(val);
      // this.getIngredients();
      this.getIngredients();
    }
  },
  methods: {
    getIngredients() {
      this.$vs.loading();
      axiosApi
        .get(`/ingredients?page=${this.currentPage}&limit=${this.limit}`)
        .then(res => {
          this.$vs.loading.close();
          this.items = res.data.docs;
          this.totalPages = res.data.totalPages;
          this.limit = res.data.limit;
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
          name: "ingredient-new"
          // params: { item_id: item_id }
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>