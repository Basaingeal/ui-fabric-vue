<template>
  <div class="ms-Grid" :dir="dir">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    dir: {
      required: true,
      type: String,
      validator: input => ["ltr", "rtl"].includes(input)
    }
  }
};
</script>
