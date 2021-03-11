import './App.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';

const setores = [
  {"id": "1", "name": "Tecnologia da Informação"},
  {"id": "2", "name": "Controle de Infecção"},
  {"id": "2", "name": "Nutição"},
  {"id": "2", "name": "Faturamento"},
  {"id": "2", "name": "Gestão da Qualidade"}
]


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Frame">
          <InputGroup className="mb-3 First-Field">
            <FormControl placeholder="Nome"/>
          </InputGroup>

          <InputGroup className="mb-3 Other-Field">
            <FormControl placeholder="Sujestão ..." as="textarea" rows="10"/>
          </InputGroup>

          <InputGroup className="mb-3 Other-Field">
            <FormControl placeholder="Setor" as="select">
              {
                setores.map(setor => (
                  <option value={setor.id}>{setor.name}</option>
                ))
              }
            </FormControl>
          </InputGroup>

          <Button className="Other-Field" variant="primary" size="lg">Primary</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
