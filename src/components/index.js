import { pluginFactory } from "../utils/plugins";

import { LayoutPlugin } from "./layout";

export const componentPlugin = pluginFactory({
  plugins: {
    LayoutPlugin
  }
});
