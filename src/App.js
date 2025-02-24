import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import StringToNumber from './components/StringsToNumber';
import SampleApi from './components/SampleApi';


function App() {

  return (
    <div className="App" >
      <Home />
      <StringToNumber />
      <SampleApi />
    </div>
  );
}

export default App;