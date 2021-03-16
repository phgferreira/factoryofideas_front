import axios from 'axios';

const SECTORS_REST_API_URL = 'http://localhost:8080/idea/sectors';

class SectorService {
    getSectors() {
        return axios.get(SECTORS_REST_API_URL);
    }
}

export default new SectorService();