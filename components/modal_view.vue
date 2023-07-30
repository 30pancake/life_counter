<template>
  <div class="modal" v-if="show">
    <div class="bg-white rounded-lg">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>