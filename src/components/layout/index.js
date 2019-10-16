import MsGrid from "./MsGrid";
import MsGridRow from "./MsGridRow";
import MsGridCol from "./MsGridCol";
import { pluginFactory } from "../../utils/plugins";

const LayoutPlugin = pluginFactory({
  components: {
    MsGrid,
    MsGridRow,
    MsGridCol
  }
});

export { LayoutPlugin, MsGrid, MsGridRow, MsGridCol };
