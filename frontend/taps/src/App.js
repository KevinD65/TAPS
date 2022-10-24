import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Account/Login';
import Tileset from './components/Assets/Tileset';
import Map from './components/Assets/Map';
import Queries from './components/Queries/Queries';



function App() {
  return (
    <div>
    <Login/>
    <Map/>
    <Tileset/>
    <Queries/>
    </div>
    

  );
}

export default App;
