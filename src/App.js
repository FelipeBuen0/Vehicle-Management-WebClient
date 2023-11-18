import React from 'react';
import Main from './components/main';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
const App = () => {
  const items = [
    { label: 'Veículos', icon: 'pi pi-car', url: '/vehicle' },
    { label: 'Cliente', icon: 'pi pi-user', url: '/driver' },
    { label: 'Vagas', icon: 'pi pi-desktop', url: '/parkingSlot' },
    { label: 'Alertas', icon: 'pi pi-comments', url: '/warnings' },
  ];
  return (
    <PrimeReactProvider>
      <div>
        <Menubar 
          style={{ padding: '16px' }}
          model={items}
          end={<Link style={{ color: 'whitesmoke', textDecoration: 'none' }} to="/"><i className="pi pi-truck" aria-hidden="true" /> S.G.V.</Link>} />
        <div className="main-container">
          <div className="content-container">
            <ScrollPanel>
              <div className="page-content" />
              <Main />
            </ScrollPanel>
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
};
export default App;
