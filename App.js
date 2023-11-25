import Navigation from './src/pages/Navegacao';
import { ModalPortal } from 'react-native-modals';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <MenuProvider>
      <Navigation />
      <ModalPortal />
    </MenuProvider>
  );
}
