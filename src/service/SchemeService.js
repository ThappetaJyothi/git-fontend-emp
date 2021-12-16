import axios from 'axios';

const getSchemeByIdService = (sid) => {
    console.log(`getSchemeByIdService`);
    return axios.get(`/schemebyid/${sid}`);
}


export { getSchemeByIdService};