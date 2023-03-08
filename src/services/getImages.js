const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32852633-0625716e22432e941df8357a0'

export const getImages = async (query, page) => {
    return fetch(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(resp => {
        if(!resp.ok) {
            return Promise.reject(
                new Error(resp.status)) 
        }
        return resp.json()
    })
}
