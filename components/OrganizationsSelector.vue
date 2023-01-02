<template class="organizations_selector">
  <div>
    <span class="organizations_selector-title">
      Organizations
    </span>
    <v-col
      cols="12"
      sm="6"
      class="pa-0 mt-1 d-flex organizations_selector-select d-flex align-center"
    >
      <v-select
        v-model="value"
        :items="organizations"
        item-text="label"
        item-value="id"
        chips
        label="Select organizations"
        multiple
        solo
        flat
        outlined
        hide-details
        @change="change"
      />

      <div class="organizations_selector-counter ml-5 d-flex justify-center align-center">
        <span>0</span>
      </div>
    </v-col>
  </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    callback: {
      type: Function
    }
  },
  data: () => ({
    organizations: [],
    value: ''
  }),
  async beforeMount() {
    await this.$store.dispatch('organizationsSelector/getOrganizations')
    this.organizations = this.$store.getters['organizationsSelector/getOrganizations']
  },
  methods: {
    change(e) {
      const counter = document.querySelector('.organizations_selector-counter')
      counter.querySelector('span').innerText = this.value.length
      if (this.value.length) {
        counter.style.opacity = 1
      } else {
        counter.style.opacity = 0
      }
      this.$store.dispatch('organizationsSelector/setSelectedOrganizations', this.value)
      if (this.callback) {
        this.callback()
      }
    }
  }
}
</script>
<style lang="scss" scoped>

  .organizations_selector-title{
    font-size: 12px;
    color: $tertiary-color;
  }

  .v-select-list::v-deep .v-list-item__content{
    flex: unset!important;
  }

  .organizations_selector-counter{
    width: 54px;
    min-width: 54px;
    height: 54px;
    min-height: 54px;
    border-radius: 54px;
    background-color: $quinary-color;
    opacity: 0;

    &-visible{
      opacity: 1;
    }

    span{
      color: $secondary-color;
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>
