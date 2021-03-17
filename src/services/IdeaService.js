const SEND_MAIL = 'http://localhost:43002/idea/sendMail';

class IdeaService {

    sendMail(content) {
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

export default new IdeaService();