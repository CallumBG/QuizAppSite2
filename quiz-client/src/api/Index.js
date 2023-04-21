import axios from 'axios';

export const BASE_URL = 'https://quizapi20230419102402.azurewebsites.net/';

export const ENDPOINTS = {
    participant: 'participant',
    question: 'Questions',
    getAnswers : 'questions/getanswers'
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id), 
    }
}