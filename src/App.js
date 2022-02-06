import './App.css';
import { MainLayout } from './component/layout/MainLayout';
import WalletModal from './component/modal/WalletModal';
import ProposalModal from './component/modal/ProposalModal';
import { DaoProvider } from './context/DaoContext';
import { BrowserRouter } from 'react-router-dom';
import RegistrationModal from './component/modal/RegistrationModal';
import { RouteController } from './route';

function App() {

  return (
    <DaoProvider>
      <BrowserRouter>
        <MainLayout>
          <RegistrationModal />
          <ProposalModal />
          <WalletModal />
         <RouteController />
        </MainLayout>
      </BrowserRouter>
    </DaoProvider>
  );
}

export default App;
