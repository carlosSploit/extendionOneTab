import { useState } from 'react';
import './App.css';
import { ContenedorTabs } from '../contenedorTabs';
import { ContenedorTabsSend } from '../contenedorTabsSend';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

function App() {
  const [stadeActionA, setstadeActionA] = useState(false)

  const onViewTabs = (stade) => {
    setstadeActionA(stade)
  }

  return (
    <>
      <Provider store={store}>
        <div class="container_principal">
            <div class="container_subprincipal">
                {stadeActionA? (<ContenedorTabs onClosetab={onViewTabs}></ContenedorTabs>):<></>}
                <ContenedorTabsSend onAddTabsView={onViewTabs} ></ContenedorTabsSend>
            </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
