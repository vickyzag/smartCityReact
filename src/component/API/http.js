import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhZG1pbiIsInZhbHVlIjp7ImVtYWlsIjoiYWRtaW5AamVzdWlzYWRtaW4ifSwiaWF0IjoxNjA4MTMwNTI0LCJleHAiOjE2MDgyMTY5MjR9.5BxoI_lRk2jisTB9n_mL__KiCUZ6SBD-EVRDVnxAY4M';
const URL_API = 'https://sportoo.azurewebsites.net/';
const getSportHalls = async () => {
    const rep = await axios.get(URL_API + 'sportHall');
    return rep.data;

};

const getSportHallById = async (id) => {
    const rep = await axios.get(URL_API + 'sportHall/' + id);
    return rep.data;
};

const deleteSportHallById = async (id) => {
    const rep = await axios.delete(URL_API + 'sportHall/',{
        headers: {
            'Authorization': 'Bearer '+token
        },
        body: {
            id: id,
        }
    });
    return rep.data;
};

export {getSportHalls, getSportHallById, deleteSportHallById};