import {
  isBrowser,
  hasPromiseSupport,
  hasMutationObserverSupport,
  getNoWarn
} from "./env";

/**
 * Log a warning message to the console with UIFabricVue formatting
 * @param {string} message
 */
export const warn = message => /* istanbul ignore next */ {
  if (!getNoWarn()) {
    console.warn(`[UIFabricVue warn]: ${message}`);
  }
};

/**
 * Warn when no Promise support is given
 * @param {string} source
 * @returns {boolean} warned
 */
export const warnNotClient = source => {
  /* istanbul ignore else */
  if (isBrowser) {
    return false;
  } else {
    warn(`${source}: Can not be called during SSR.`);
    return true;
  }
};

/**
 * Warn when no Promise support is given
 * @param {string} source
 * @returns {boolean} warned
 */
export const warnNoPromiseSupport = source => {
  /* istanbul ignore else */
  if (hasPromiseSupport) {
    return false;
  } else {
    warn(`${source}: Requires Promise support.`);
    return true;
  }
};

/**
 * Warn when no MutationObserver support is given
 * @param {string} source
 * @returns {boolean} warned
 */
export const warnNoMutationObserverSupport = source => {
  /* istanbul ignore else */
  if (hasMutationObserverSupport) {
    return false;
  } else {
    warn(`${source}: Requires MutationObserver support.`);
    return true;
  }
};

// Default export
export default warn;
