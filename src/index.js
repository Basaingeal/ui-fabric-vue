import { componentsPlugin } from "./components";
import { installFactory } from "./utils/plugins";

const NAME = "UIFabricVue";

const install = installFactory({
  plugins: {
    componentsPlugin
  }
});

const UIFabricVue = {
  install,
  NAME
};

export {
  MsGrid,
  MsGridRow,
  MsGridCol,
  LayoutPlugin
} from "./components/layout";

export default UIFabricVue;
