import Vue from "vue";
import DEFAULTS from "./config-defaults";
import {
  isPlainObject,
  isArray,
  isUndefined,
  isString,
  cloneDeep,
  get
} from "lodash";
import warn from "./warn";
// --- Constants ---

const PROP_NAME = "$ufvConfig";

// Config manager class
class UfvConfig {
  constructor() {
    this.$_config = cloneDeep(DEFAULTS);
    this.$_cachedBreakpoints = null;
  }

  static get Defaults() /* istanbul ignore next */ {
    return DEFAULTS;
  }

  get defaults() /* istanbul ignore next */ {
    return DEFAULTS;
  }

  // Returns the defaults
  getDefaults() /* istanbul ignore next */ {
    return this.defaults;
  }

  // Method to merge in user config parameters
  setConfig(config = {}) {
    if (!isPlainObject(config)) {
      /* istanbul ignore next */
      return;
    }
    const configKeys = Object.getOwnPropertyNames(config);
    configKeys.forEach(cmpName => {
      /* istanbul ignore next */
      if (!hasOwnProperty(DEFAULTS, cmpName)) {
        warn(`config: unknown config property "${cmpName}"`);
        return;
      }
      const cmpConfig = config[cmpName];
      if (cmpName === "breakpoints") {
        // Special case for breakpoints
        const breakpoints = config.breakpoints;
        /* istanbul ignore if */
        if (
          !isArray(breakpoints) ||
          breakpoints.length < 2 ||
          breakpoints.some(b => !isString(b) || b.length === 0)
        ) {
          warn(
            'config: "breakpoints" must be an array of at least 2 breakpoint names'
          );
        } else {
          this.$_config.breakpoints = cloneDeep(breakpoints);
        }
      } else if (isPlainObject(cmpConfig)) {
        // Component prop defaults
        const props = Object.getOwnPropertyNames(cmpConfig);
        props.forEach(prop => {
          /* istanbul ignore if */
          if (!Object.prototype.hasOwnProperty.call(DEFAULTS[cmpName], prop)) {
            warn(`config: unknown config property "${cmpName}.${prop}"`);
          } else {
            if (!isUndefined(cmpConfig[prop])) {
              this.$_config[cmpName][prop] = cloneDeep(cmpConfig[prop]);
            }
          }
        });
      }
    });
  }

  // Clear the config. For testing purposes only
  resetConfig() {
    this.$_config = {};
  }

  // Returns a deep copy of the user config
  getConfig() {
    return cloneDeep(this.$_config);
  }

  getConfigValue(key) {
    // First we try the user config, and if key not found we fall back to default value
    // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
    return cloneDeep(get(this.$_config, key, get(DEFAULTS, key)));
  }
}

// Method for applying a global config
export const setConfig = (config = {}, Vue = Vue) => {
  // Ensure we have a $bvConfig Object on the Vue prototype.
  // We set on Vue and OurVue just in case consumer has not set an alias of `vue`.
  Vue.prototype[PROP_NAME] = Vue.prototype[PROP_NAME] || new UfvConfig();
  // Apply the config values
  Vue.prototype[PROP_NAME].setConfig(config);
};

// Method for resetting the user config. Exported for testing purposes only.
export const resetConfig = () => {
  if (Vue.prototype[PROP_NAME] && Vue.prototype[PROP_NAME].resetConfig) {
    Vue.prototype[PROP_NAME].resetConfig();
  }
};
