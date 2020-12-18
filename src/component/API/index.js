import {connexion, getSportHalls, getSportHallById, postSportHall, deleteSportHallById, updateSportHall} from './http';

const login = async (email, password) => {
    try {
        await connexion(email, password);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};

const loadSportHalls = async () => {
    try {
        const data = await getSportHalls();
        const sportHalls = []
        for (const sportHall of data) {
            sportHalls.push(
            {
                id: sportHall.id,
                name: sportHall.name,
                manager: (sportHall.manager?sportHall.manager.last_name +" "+ sportHall.manager.first_name+" ("+sportHall.manager.email+")":"Pas de manager"),
                phone_number: sportHall.phone_number,
                email: sportHall.email_sh,
                address: sportHall.address+", "+sportHall.zip_code+" "+sportHall.city_name+" "+sportHall.country,
            }
        )
        }
        return sportHalls;
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}

const addSportHall = async (name, manager, phoneNumber, email, address, city, zipCode, country) => {
    try {
        await postSportHall(name, manager, phoneNumber, email, address, city, zipCode, country);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}

const modifySportHall = async (id, name, manager, phoneNumber, email, address, city, zipCode, country) => {
    try {
        await updateSportHall(id, name, manager, phoneNumber, email, address, city, zipCode, country);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}

const loadSportHall = async (sportHallId) => {
    try {
        const data = await getSportHallById(sportHallId);
        return {
            sportHallId: data.id,
            name: data.name,
            manager: data.manager.email,
            phone_number: data.phone_number,
            email: data.email_sh,
            address: data.address,
            city_name: data.city_name,
            zip_code: data.zip_code,
            country: data.country
        };
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};

const deleteSportHall = async (sportHallId) => {
    try {
        await deleteSportHallById(sportHallId);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};



export {login, loadSportHalls, loadSportHall, addSportHall, modifySportHall, deleteSportHall};