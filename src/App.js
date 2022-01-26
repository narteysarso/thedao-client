import './App.css';
import { MainLayout } from './component/layout/MainLayout';
import { Welcome } from './component/page/Welcome';
import WalletModal from './component/modal/WalletModal';
import ProposalModal from './component/modal/ProposalModal';
import {  DaoProvider } from './context/DaoContext';

function App() {
  
  return (
    <DaoProvider>
      <MainLayout>
        <ProposalModal  />
        <WalletModal  />
        <Welcome />
      </MainLayout>
    </DaoProvider>
  );
}

export default App;
