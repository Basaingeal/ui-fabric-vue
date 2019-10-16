<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
import { isString, isBoolean } from "util";
const range = (begin, end) =>
  [...Array(end - begin + 1).keys()].map(i => i + begin);

const in1to12 = input =>
  range(1, 12).includes(input) ||
  range(1, 12).map(input => String(input).includes(input));

const upOrDown = input =>
  isBoolean(input) || ["up", "down"].includes(input.toLowerCase());

export default {
  props: {
    sm: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    md: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    lg: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xl: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xxl: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xxxl: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    smPush: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    mdPush: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    lgPush: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xlPush: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xxlPush: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xxxlPush: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    smPull: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    mdPull: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    lgPull: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xlPull: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xxlPull: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    xxxlPull: {
      type: [Number, String],
      default: null,
      validator: in1to12
    },
    hiddenSm: {
      type: Boolean,
      default: null
    },
    hiddenMd: {
      type: [Boolean, String],
      default: null,
      validator: upOrDown
    },
    hiddenLg: {
      type: [Boolean, String],
      default: null,
      validator: upOrDown
    },
    hiddenXl: {
      type: [Boolean, String],
      default: null,
      validator: upOrDown
    },
    hiddenXxl: {
      type: [Boolean, String],
      default: null,
      validator: upOrDown
    },
    hiddenXxxl: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    className() {
      const classNames = ["ms-Grid-col"];

      Object.entries(this.$props).forEach(prop => {
        const propName = prop[0];
        let propValue = prop[1];

        if (propValue !== null && propValue !== false) {
          if (propName.includes("hidden") && isString(propValue)) {
            propValue = propValue.toLowerCase();
            propValue = propValue.charAt(0).toUpperCase() + propValue.slice(1);
          }

          classNames.push(
            `ms-${propName}${propValue === true ? "" : propValue}`
          );
        }
      });

      return classNames;
    }
  }
};
</script>
