import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import CalendarStack from './CalendarStack';
import NotificationStack from './NotificationStack';
import ProfileStack from './ProfileStack';

const RootDrawerNavigator = createDrawerNavigator({
    Calendar: {
        screen: CalendarStack,
    },
    Notifications: {
        screen: NotificationStack,
    },
    Profile: {
        screen: ProfileStack,
    }
});

export default createAppContainer(RootDrawerNavigator);