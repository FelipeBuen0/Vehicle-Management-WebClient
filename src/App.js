import { React, useState } from 'react';
import Main from './components/main';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { PrimeReactProvider } from 'primereact/api';
import './App.css';
import 'primeicons/primeicons.css';
import { Login } from './views/login';
const App = () => {
  const [authenticated] = useState(localStorage.getItem('tk') || null);

  const items = [
    { label: 'Veículos', icon: 'pi pi-car', url: '/vehicle' },
    { label: 'Cliente', icon: 'pi pi-user', url: '/driver' },
    { label: 'Vagas', icon: 'pi pi-desktop', url: '/parkingSlot' },
    { label: 'Alertas', icon: 'pi pi-comments', url: '/warnings' },
  ];
  const parse = (token) => {
    if (!token) {
      return false;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return jsonPayload;
  }

  let page = (
    <div className="login-container flex justify-content-center align-items-center">
      <div>
        <Login />
      </div>
    </div>
  )

  if (parse(authenticated)) {
    page = (
      <>
        <Menubar
          style={{ padding: '16px' }}
          model={items}
          end={<b><Link style={{ color: 'whitesmoke', textDecoration: 'none' }} to="/"><i className="pi pi-truck" aria-hidden="true" /> SGVeiculos</Link></b>} />
        <div className="main-container">
          <div className="content-container">
            <ScrollPanel>
              <div className="page-content" />
              <Main />
            </ScrollPanel>
          </div>
        </div>
      </>);
  }


  return (
    <PrimeReactProvider>
      <div className='app'>
        {page}
      </div>
    </PrimeReactProvider>
  );
};
export default App;
