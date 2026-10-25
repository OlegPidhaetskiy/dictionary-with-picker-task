// Drawer navigation relies on gesture-handler and reanimated,
// which need their official jest mocks to run outside of a device.
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);
