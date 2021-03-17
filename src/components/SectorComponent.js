import { Component } from 'react';
import { Form } from 'react-bootstrap';
import '../App.css';
import SectorService from '../services/SectorService';

class SectorComponent extends Component {

    // Infelizmente não consegui transferir o estado do SectorComponent para o App
    // Por isso migruei todo o código para o App e vou tentar melhorar depois

    constructor(props) {
        super(props)
        this.state = {
            sectors: [],
        }
    }

    componentDidMount() {
        SectorService.getSectors().then((response) => {
            this.setState({
                sectors: response.data
            })
        })
    }

    onChange(e) {
        this.props.onChange(e);
    }

    render(props) {
        return(
            <Form.Group className="Field">
              <Form.Label>Setor</Form.Label>
                <Form.Control name="sector" as="select"
                    onChange={ this.onChange }>
                    {
                    this.state.sectors
                        .sort( (a, b) => a.name > b.name ? 1 : -1 )
                        .map( sector => (
                        <option key={sector.id} value={sector.id}> {sector.name} </option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
        );
    }
}

export default SectorComponent;