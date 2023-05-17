import axios from 'axios';

// Création d'une instance axios
const instance = axios.create({
    baseURL: 'https://twitter-clone-d0a33-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;