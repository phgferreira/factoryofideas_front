import axios from 'axios';

const GET_SECTORS = 'http://localhost:8080/idea/sectors';
const SEND_MAIL = 'http://localhost:8080/idea/sendMail';
const WEBHOOK = 'https://webhook.site/68e70d52-1c5b-4448-9e26-06d1f08a8a4a';

class SectorService {
    
    getSectors() {
        console.log('+ SectorService.getSectors')
        return axios.get(GET_SECTORS);
    }

    sendMail(content) {
        console.log('+ SectorService.sendMail: ' + content)
        return fetch(SEND_MAIL, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        }).then((response) => response.json())
    }
}

export default new SectorService();