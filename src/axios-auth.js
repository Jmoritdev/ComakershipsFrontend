
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://comakershipsapipentest.azurewebsites.net/',
    headers: { 'Content-Type': 'application/json' },
});

export default instance;