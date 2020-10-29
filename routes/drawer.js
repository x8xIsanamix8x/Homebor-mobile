import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import LoginStack from './loginStack';

const RootDrawerNavigator = createDrawerNavigator({
    Calendar: {
        screen: LoginStack
    }
});

export default createAppContainer(RootDrawerNavigator);