import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import CalendarStack from './CalendarStack';

const RootDrawerNavigator = createDrawerNavigator({
    Calendar: {
        screen: CalendarStack
    }
});

export default createAppContainer(RootDrawerNavigator);