import axios from 'axios';

const GET_SECTORS = 'http://localhost:43002/idea/sectors';
//const WEBHOOK = 'https://webhook.site/68e70d52-1c5b-4448-9e26-06d1f08a8a4a';

class SectorService {
    
    getSectors() {
        return axios.get(GET_SECTORS);
    }

}

export default new SectorService();