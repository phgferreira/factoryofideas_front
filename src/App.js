import { Component } from 'react';
import './App.css';
import { Form, Button, Alert } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import SectorService from './services/SectorService';
import IdeaService from './services/IdeaService';

class App extends Component {

  initialState = {
    name: '',
    suggestion: '',
    sector: {
      id: ''
    },
    sectors: [],
    result: 'ainda não foi enviado',
    variant: 'secondary'
  }

  constructor(props) {
    super(props);

    this.state = this.initialState;

    this.onChange = this.onChange.bind(this);
  }

  reset() {
    this.setState(this.initialState);
    this.componentDidMount();
    this.setState({ result: true })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    SectorService.getSectors().then((response) => {
        this.setState({
            sectors: response.data
        })
    })
  }

  async postIdea() {
    try {
      IdeaService.sendEmail(this.state).then((response) => {
        this.reset();
        this.setState({
          result: response.data,
          variant: 'success'
        })
      });
    } catch(e) {
      console.error('Failed: ' + e);
    }
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <div className="Frame">
            <Form.Group className="Field First-Field">
              <Form.Label>Nome (opcional)</Form.Label>
              <Form.Control name="name" placeholder="Digite seu nome"
                value={ this.state.name }
                onChange={ this.onChange }></Form.Control>
            </Form.Group>

            <Form.Group className="Field">
              <Form.Label>Sugestão</Form.Label>
              <Form.Control name="suggestion" as="textarea" placeholder="Digite aqui sua sujestão" rows="10"
                value={ this.state.suggestion }
                onChange={ this.onChange }></Form.Control>
            </Form.Group>

            <Form.Group className="Field">
              <Form.Label>Setor</Form.Label>
                <Form.Control name="sector" as="select"
                    onChange={ (e) => { this.setState({ sector: { id: e.target.value } }) } }>
                    {
                    this.state.sectors
                        .sort( (a, b) => a.name > b.name ? 1 : -1 )
                        .map( sector => (
                        <option key={sector.id} value={sector.id}> {sector.name} </option>
                        ))
                    }
                </Form.Control>
            </Form.Group>

            <Button onClick={ () => this.postIdea() } className="Send-Button" variant="primary" size="lg">Enviar</Button>

            <Alert variant={ this.state.variant }>{ this.state.result }</Alert>

          </div>
        </header>
      </div>
    );
  }
}

export default App;
