import './app.scss';

import { useAppSelector } from './hooks/hooks';

import Login from './components/Login';

function App() {
  const { authorized } = useAppSelector((state) => state.lkSlice);

  return <div>{!authorized ? <Login /> : <div>client page</div>}</div>;
}

export default App;
