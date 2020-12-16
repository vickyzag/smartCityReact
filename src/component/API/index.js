import {getSportHalls, getSportHallById} from './http';

const loadSportHalls = async () => {
    try {
        const data = await getSportHalls();
        const sportHalls = []
        for (const sportHall of data) {
            sportHalls.push(
            {
                id: sportHall.id,
                name: sportHall.name,
                manager: sportHall.manager.last_name +" "+ sportHall.manager.first_name+" ("+sportHall.manager.email+")",
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

export {loadSportHalls, loadSportHall};