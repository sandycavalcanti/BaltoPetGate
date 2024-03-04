import Navigation from './src/pages/Navegacao';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <MenuProvider>
      <Navigation />
    </MenuProvider>
  );
}
