import type { PropsWithChildren } from 'react';
import {
  useColorScheme,
} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './store/store';
import RootNavigator from './navigation/RootNavigator';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>

  );
}

export default App;
