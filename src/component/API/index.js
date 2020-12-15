import {getSportHallById} from './http';

const loadData = async (sportHallId) => {
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

export {loadData};