<template>
  <el-button :type="type"
             :size="size"
             :disabled="disabled"
             :loading="loading"
             :config="config"
             @click="onClick">
    <span>
      <slot></slot>
    </span>
  </el-button>
</template>
<script>
export default {
  name: "label-button",
  props: {
    type: { type: String, default: "" },
    size: { type: String, default: "" },
    config: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    timeOut: { type: Number, default: 3000 },
  },
  data() {
    return {
      isNormal: true,
      useLoading: false,
    };
  },
  created() {
    if (this.loading != null) {
      this.useLoading = true;
    }
  },
  computed: {},
  methods: {
    onClick() {
      if (this.isNormal) {
        if (!this.useLoading) {
          this.isNormal = false;
          setTimeout(() => {
            this.isNormal = true;
          }, this.timeOut);
        }
        this.$emit("click");
      }
    },
  },
};
</script>

<style scoped>
</style>
