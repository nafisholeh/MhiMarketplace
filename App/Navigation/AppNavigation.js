import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import ConsumerNavigation from './Tabs/ConsumerNavigation';
import CourierNavigation from './Tabs/CourierNavigation';
import FinanceNavigation from './Tabs/FinanceNavigation';
import StockOpnameNavigation from './Tabs/StockOpnameNavigation';
import AdminNavigation from './Tabs/AdminNavigation';
import FarmerNavigation from './Farmer/Tab/MainTab';

import Setup from 'Containers/Setup/Setup';
import SubAppChooser from 'Containers/Setup/SubAppChooser';
import VillageAccount from './DigitalVillage/Stack/Account';

const PrimarySwitchNavigator = createSwitchNavigator(
  {
    Setup: { screen: Setup },
    SubAppChooser: { screen: SubAppChooser },
    VillageAccount: { screen: VillageAccount },
    ConsumerNav: { screen: ConsumerNavigation },
    CourierNav: { screen: CourierNavigation },
    FinanceNav: { screen: FinanceNavigation },
    StockOpnameNav: { screen: StockOpnameNavigation },
    AdminNav: { screen: AdminNavigation },
    FarmerNav: { screen: FarmerNavigation },
  },
  {
    initialRouteName: 'VillageAccount',
  }
);

export default createAppContainer(PrimarySwitchNavigator);
