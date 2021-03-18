const SEND_MAIL = 'http://localhost:43002/idea/sendEmail';

class IdeaService {

    sendEmail(idea) {
        return fetch(SEND_MAIL, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idea)
        }).then((response) => response.ok)
    }

}

export default new IdeaService();