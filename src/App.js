import './App.css';
import { MainLayout } from './component/layout/MainLayout';
import { Welcome } from './component/page/Welcome';

function App() {
  return (
    <MainLayout>
      <Welcome />
    </MainLayout>
  );
}

export default App;
