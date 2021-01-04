
<template>
  <vx-card class="grid-view-item mb-base overflow-hidden" v-on="$listeners">
    <template slot="no-body">
      <!-- ITEM IMAGE -->
      <div
        class="item-img-container bg-white h-64 flex items-center justify-center mb-4 cursor-pointer"
        @click="navigate_to_detail_view(item._id)"
      >
        <img v-if="item.image" :src="item.image" :alt="item.name" class="grid-view-img px-4" />
        <img
          v-else
          src="@/assets/images/pages/no-img.png"
          :alt="item.nameAr"
          class="grid-view-img px-4"
        />
      </div>
      <div class="item-details px-4">
        <!-- TITLE & DESCRIPTION -->
        <div class="my-4">
          <h6
            class="truncate font-semibold mb-1 hover:text-primary cursor-pointer"
          >{{ item.name }}</h6>
          <!-- <p class="item-description truncate text-sm">{{ item.nameAr }}</p> -->
          <p class="item-description truncate text-sm">{{ item.descAr||item.nameAr }}</p>
        </div>
      </div>

      <!-- SLOT: ACTION BUTTONS -->
      <slot name="action-buttons" />
    </template>
  </vx-card>
  <!--  </div>
  </div>-->
</template>

<script>
export default {
  props: {
    url: { type: String, required: true },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigate_to_detail_view(item_id) {
      this.$router
        .push({
          name: this.url,
          params: { id: item_id }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.grid-view-item {
  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }
}
</style>
