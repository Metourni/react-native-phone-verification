import {createAppContainer} from 'react-navigation';

import MainNavigator from './src/navigations/main-navigator';

const App = createAppContainer(MainNavigator);

export default App;
