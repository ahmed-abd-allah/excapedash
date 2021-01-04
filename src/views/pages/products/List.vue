<template>
  <div>
    <div>

          <div class="items-grid-view vx-row match-height" ref="loading" id="loading">
            <div
              class="vx-col lg:w-1/4 sm:w-1/2 w-full"
              v-for="item in works"
              :key="item._id"
            >
              <item-grid-view :item="item" url="edit-products">
                <!-- SLOT: ACTION BUTTONS -->
                <template slot="action-buttons">
                  <div class="flex flex-wrap">
                    <div
                      class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                      @click="showDetails(item._id)"
                    >
                      <feather-icon icon="EyeIcon" svgClasses="h-4 w-4" />

                      <span
                        class="text-lg font-semibold ml-2"
                        @click="showDetails(item.id)"
                      >عرض التفاصيل</span>
                    </div>
                  </div>
                </template>
              </item-grid-view>
            </div>
          </div>
          <div v-if="TotalPages" class="vx-col lg:w-1/4 sm:w-1/2 w-full">
            <vs-pagination
              :total="TotalPages"
              v-model="Current"
              prev-icon="arrow_forward"
              next-icon=" arrow_back"
            ></vs-pagination>
          </div>
  
    </div>
  </div>
</template>

<script>
import axiosApi from "../../../axios";

export default {
  components: {
    ItemGridView: () => import("../../../components/productsItemGridView")
  },
  data() {
    return {
      works: null,
      Current: 1,
      TotalPages: 0,
      
    };
  },
  created() {
    this.getworks();

  },
  watch: {
    Current(newC,oldC){
      if (newC!=oldC) {
        this.getworks()
      }
    }
  },
  methods: {
    async getworks() {
      this.$vs.loading();
      await axiosApi
        .get(`/works?page=${this.Current}&nameEn=&nameAr=&serviceId=&subServiceId=  `)
        .then(res => {
          this.$vs.loading.close();
          this.works = res.data.data;
          this.TotalPages = res.data.totalPages;
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
          name: "edit-products",
          params: { id: item_id }
        })
        .catch(() => {});
    },

  }
};
</script>

<style>
</style>