import './App.css';
import { MainLayout } from './component/layout/MainLayout';
import { Welcome } from './component/page/Welcome';
import WalletModal from './component/modal/WalletModal';
import ProposalModal from './component/modal/ProposalModal';
import { DaoProvider } from './context/DaoContext';
import { BrowserRouter } from 'react-router-dom';
import RegistrationModal from './component/modal/RegistrationModal';

function App() {

  return (
    <DaoProvider>
      <BrowserRouter>
        <MainLayout>
          <RegistrationModal />
          <ProposalModal />
          <WalletModal />
          <Welcome />
        </MainLayout>
      </BrowserRouter>
    </DaoProvider>
  );
}

export default App;
