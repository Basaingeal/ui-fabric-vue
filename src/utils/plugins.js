import { setConfig } from "./config-set";
import { hasWindowSupport } from "./env";

export const installFactory = ({ components, directives, plugins } = {}) => {
  const install = (Vue, config = {}) => {
    if (install.installed) {
      return;
    }

    install.installed = true;
    setConfig(config, Vue);
    registerComponents(Vue, components);
    registerDirectives(Vue, directives);
    registerPlugins(Vue, plugins);
  };

  install.installed = false;

  return install;
};

export const pluginFactory = (opts = {}, extend = {}) => ({
  ...extend,
  install: installFactory(opts)
});

export const registerPlugins = (Vue, plugins = {}) => {
  for (const plugin in plugins) {
    if (plugin && plugins[plugin]) {
      Vue.use(plugins[plugin]);
    }
  }
};

export const registerComponent = (Vue, name, def) => {
  if (Vue && name && def) {
    Vue.component(name, def);
  }
};

export const registerComponents = (Vue, components = {}) => {
  for (const component in components) {
    registerComponent(Vue, component, components[component]);
  }
};

export const registerDirective = (Vue, name, def) => {
  if (Vue && name && def) {
    // Ensure that any leading V is removed from the
    // name, as Vue adds it automatically
    Vue.directive(name.replace(/^VB/, "B"), def);
  }
};

export const registerDirectives = (Vue, directives = {}) => {
  for (const directive in directives) {
    registerDirectives(Vue, directive, directives[directive]);
  }
};

export const vueUse = VuePlugin => {
  if (hasWindowSupport && window.Vue) {
    window.Vue.use(VuePlugin);
  }

  if (hasWindowSupport && VuePlugin.NAME) {
    window[VuePlugin.NAME] = VuePlugin;
  }
};
