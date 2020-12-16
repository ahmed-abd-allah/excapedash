<template>
  <div>
    <!-- <vs-row class="mb-3">
      <div class="vx-col sm:w-1/3 w-full mb-2">
        <vs-input
          class="ml-1"
          icon="search"
          @keyup.enter.native="filterResults()"
          placeholder="الاسم "
          v-model="nameFilter"
        />
      </div>
      <div class="vx-col sm:w-1/3 w-full mb-2">
        <vs-input
          class="ml-1"
          icon="search"
          type="number"
          @keyup.enter.native="filterResults()"
          placeholder="رقم الهاتف "
          v-model="phoneFilter"
        />
      </div>
      <div class="vx-col sm:w-1/3 w-full mb-2">
        <vs-input
          class="ml-1"
          icon="search"
          type="number"
          @keyup.enter.native="filterResults()"
          placeholder="رقم التعريف id"
          v-model="idFilter"
        />
      </div>
    </vs-row> -->
    <div
      v-if="users.length>0"
      class="items-grid-view vx-row match-height"
      ref="loading"
      id="loading"
    >
      <div class="vx-col lg:w-1/4 sm:w-1/2 w-full" v-for="item in users" :key="item._id">
        <item-grid-view :item="item" :url="`edit-client`">
          <!-- SLOT: ACTION BUTTONS -->
          <template slot="action-buttons">
            <div class="flex flex-wrap">
              <div
                class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                @click="showDetails(item._id)"
              >
                <feather-icon icon="EyeIcon" svgClasses="h-4 w-4" />
                <!-- @click="showDetails(item.id)" -->
                <span class="text-lg font-semibold ml-2">عرض التفاصيل</span>
              </div>
            </div>
          </template>
        </item-grid-view>
      </div>
    </div>
    <div
      v-else-if="users.length==0 && !loading"
      class="items-grid-view vx-row match-height"
      ref="loading"
      id="loading"
    >
      <div class="w-full content-center h-48">
        <h2 class="text-center text-black mt-5">
          <span class="text-lg">
            <vs-icon icon="not_interested"></vs-icon>
          </span>
          <br />
لا توجد نتائج مطابقة لما تبحث عنه
        </h2>
      </div>
    </div>
    <div v-if="total>1" class="vs-row flex justify-center bg-gray-200">
      <vs-pagination
        :total="total"
        v-model="current"
        prev-icon="arrow_forward"
        next-icon=" arrow_back"
      ></vs-pagination>
    </div>
  </div>
</template>

<script>
import axiosApi from "../axios";

export default {
  props: ["role"],
  components: {
    ItemGridView: () => import("../components/ItemWithPhotosGridView")
  },
  data() {
    return {
      current: 1,
      total: 0,
      users: [],
      serviceTotalPages: 0,
      nameFilter: "",
      phoneFilter: "",
      idFilter: "",
      loading: true
    };
  },
  methods: {
    //?q=bakrey&page=2

    filterResults(current) {
      this.$vs.loading();

      let req = `user?role=${this.role}&&page=${current}`;
      if (
        this.nameFilter != "" &&
        this.phoneFilter == "" &&
        this.idFilter == ""
      ) {
        req = `user?role=${this.role}&q=${this.nameFilter}&page=${current}`;
      } else if (
        this.nameFilter == "" &&
        this.phoneFilter != "" &&
        this.idFilter == ""
      ) {
        req = `user?role=${this.role}&phone=${this.phoneFilter}&page=${current}`;
      } else if (
        this.idFilter != "" &&
        this.nameFilter == "" &&
        this.phoneFilter == ""
      ) {
        req = `user?role=${this.role}&id=${this.idFilter}&page=${current}`;
      } else if (
        this.idFilter != "" &&
        this.nameFilter != "" &&
        this.phoneFilter == ""
      ) {
        req = `user?role=${this.role}&id=${this.idFilter}&q=${this.nameFilter}&page=${current}`;
      } else if (
        this.idFilter != "" &&
        this.nameFilter == "" &&
        this.phoneFilter != ""
      ) {
        req = `user?role=${this.role}&id=${this.idFilter}&phone=${this.phoneFilter}&page=${current}`;
      } else if (
        this.idFilter == "" &&
        this.nameFilter != "" &&
        this.phoneFilter != ""
      ) {
        req = `user?role=${this.role}&q=${this.nameFilter}&phone=${this.phoneFilter}&page=${current}`;
      } else if (
        this.idFilter != "" &&
        this.nameFilter != "" &&
        this.phoneFilter != ""
      ) {
        req = `user?role=${this.role}&q=${this.nameFilter}&id=${this.idFilter}&phone=${this.phoneFilter}&page=${current}`;
      }
      axiosApi
        .get(req)
        .then(res => {
          this.users = res.data.data;
          this.total = res.data.totalPages;
          console.log("posts Data =====> ", res.data.docs);
          this.$vs.loading.close();
          this.loading = false;
        })
        .catch(e => {
          //console.log(e);
          this.$vs.loading.close();
        });
    },
    getUsers() {
      this.$vs.loading();

      axiosApi
        .get(`user?role=${this.role}&page=${this.current}`)
        .then(res => {
          this.isLoading = false;
          this.users = res.data.data;
          this.total = res.data.totalPages;
          //console.log("posts Data =====> ", res.data.docs);
          this.$vs.loading.close();
          this.loading = false;
        })
        .catch(e => {
          //console.log(e);
          this.$vs.loading.close();
        });
    },
    showDetails(item_id) {
      console.log(item_id);
      this.$router
        .push({
          name: `edit-client`,
          params: { id: item_id }
        })
        .catch(() => {});
    }
  },
  watch: {
    nameFilter() {
      if (
        this.nameFilter == "" &&
        this.phoneFilter == "" &&
        this.idFilter == "" && this.current != 1
      ) {
        this.current = 1;

        this.getUsers();
      }
      this.current = 1;
    },
    phoneFilter() {
      if (
        this.nameFilter == "" &&
        this.phoneFilter == "" &&
        this.idFilter == "" && this.current != 1
      ) {
        this.current = 1;

         this.getUsers();
      }
      this.current = 1;
    },
    idFilter() {
      if (
        this.nameFilter == "" &&
        this.phoneFilter == "" &&
        this.idFilter == "" && this.current != 1
      ) {
        this.current = 1;

         this.getUsers();
      }
      this.current = 1;
    },

    current: function(newValue, oldValue) {
      if (newValue != oldValue) {
        if (
          this.nameFilter != "" ||
          this.phoneFilter != "" ||
          this.idFilter != ""
        ) {
          this.filterResults(newValue);
        } else {
          this.getUsers();
        }
        // //console.log("Changed!" + newValue.value);
      } else {
        // //console.log("same");
      }
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style lang="stylus"></style>