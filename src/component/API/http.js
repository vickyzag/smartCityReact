import axios from 'axios';
import {getHeader, getAPI} from "./utils";


const SPORTHALL_URL = getAPI("sportHall/");
const LOGIN_URL = getAPI("user/login");

const connexion = async (email, password) => {
    try {
        const resp = await axios.post(LOGIN_URL, {
            email: email,
            password: password
        });
        localStorage.setItem("token", resp.data);
    } catch (e) {
        throw new Error("Erreur"+e.toString());
    }
};

const getSportHalls = async () => {
    const rep = await axios.get(SPORTHALL_URL);
    return rep.data;

};

const getSportHallById = async (id) => {
    const rep = await axios.get(SPORTHALL_URL + id);
    return rep.data;
};

const postSportHall = async (name, manager, phoneNumber, email, address, city, zipCode, country) => {
    await axios.post(SPORTHALL_URL,
        {
            name: name,
            manager: manager,
            phone_number: phoneNumber,
            email: email,
            address: address,
            city_name: city,
            zip_code: zipCode,
            country: country
        },
        {headers: getHeader()})
}

const updateSportHall = async (id, name, manager, phoneNumber, email, address, city, zipCode, country) => {
    await axios.patch(SPORTHALL_URL,
        {
            id: id,
            name: name,
            manager: manager,
            phone_number: phoneNumber,
            email: email,
            address: address,
            city_name: city,
            zip_code: zipCode,
            country: country
        },
        {headers: getHeader()})
}

const deleteSportHallById = async (id) => {
    const rep = await axios.delete(SPORTHALL_URL,{
        headers: getHeader(),
        data: {
            id: id
        }
    });

    return rep.data;
};

export {connexion, getSportHalls, getSportHallById, postSportHall, updateSportHall, deleteSportHallById};