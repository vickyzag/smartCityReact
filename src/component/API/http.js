import axios from 'axios';
import {getHeader, getAPI} from "./utils";


const SPORTHALL_URL = getAPI("sportHall/");
const COURSE_URL = getAPI("course/");
const ROOM_URL = getAPI("room/");
const LOGIN_URL = getAPI("user/login");
const CUSTOMER_URL = getAPI("customer/");
const MANAGER_URL = getAPI("manager/");
const CUSTOMER_COURSE_URL = getAPI("customerCourse/")
const CUSTOMER_SPORTHALL_URL = getAPI("sportHallCustomer/");
const ADMIN_URL = getAPI("admin/");
const COURSE_CUSTOMER_URL = getAPI("customerCourse/")
const SPORTHALL_CUSTOMER_URL = getAPI("sportHallCustomer/");

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
const getCourses = async () => {
    const rep = await axios.get(COURSE_URL);
    return rep.data;

};
const getCourseById = async (id) => {
    const rep = await axios.get(COURSE_URL + id);
    return rep.data;
};
const postCourse = async (sportHall, room, startingDateTime, endingDateTime, level, activity, instructor) => {
    await axios.post(COURSE_URL,
        {
            id_sport_hall: sportHall,
            id_room: room,
            starting_date_time: startingDateTime,
            ending_date_time: endingDateTime,
            level: level,
            activity: activity,
            instructor: instructor,
        },
        {headers: getHeader()})
}
const updateCourse = async (id, sportHall, room, startingDateTime, endingDateTime, level, activity, instructor) => {
    await axios.patch(COURSE_URL,
        {
            id: id,
            id_sport_hall: sportHall,
            id_room: room,
            starting_date_time: startingDateTime,
            ending_date_time: endingDateTime,
            level: level,
            activity: activity,
            instructor: instructor,
        },
        {headers: getHeader()})
}
const deleteCourseById = async (id) => {
    const rep = await axios.delete(COURSE_URL,{
        headers: getHeader(),
        data: {
            id: id
        }
    });

    return rep.data;
};
const getCourseCustomers = async (id) => {
    const rep = await axios.get(CUSTOMER_COURSE_URL+ "course/" + id,
        {headers: getHeader()});
    return rep.data;
};
const getSportHallCustomers = async (id) => {
    const rep = await axios.get(CUSTOMER_SPORTHALL_URL + "sportHall/" + id,
        {headers: getHeader()});
    return rep.data;
};
const getRooms = async () => {
    const rep = await axios.get(ROOM_URL);
    return rep.data;

};
const getRoomById = async (id_room, id_sport_hall) => {
    const rep = await axios.get(ROOM_URL + id_sport_hall + "-" + id_room);
    return rep.data;
};
const postRoom = async (id_room, id_sport_hall, max_capacity) => {
    await axios.post(ROOM_URL,
        {
            id_room: id_room,
            id_sport_hall: id_sport_hall,
            max_capacity: max_capacity,
        },
        {headers: getHeader()})
}
const updateRoom = async (id_room, id_sport_hall, max_capacity) => {
    await axios.patch(ROOM_URL,
        {
            id_room: id_room,
            id_sport_hall: id_sport_hall,
            max_capacity: max_capacity
        },
        {headers: getHeader()})
}
const deleteRoomById = async (id_room, id_sport_hall) => {
    const rep = await axios.delete(ROOM_URL,{
        headers: getHeader(),
        data: {
            id_room: id_room,
            id_sport_hall: id_sport_hall
        }
    });

    return rep.data;
};
const getCustomers = async () => {
    const rep = await axios.get(CUSTOMER_URL,
        {headers: getHeader()}
    );
    return rep.data;

};
const getCustomerByEmail = async (email) => {
    const rep = await axios.get(CUSTOMER_URL + email,
        {headers: getHeader()});
    return rep.data;
};
const postCustomer = async (first_name, last_name, birth_date, gender, phoneNumber, email, password, language, address, city, zipCode, country) => {
    await axios.post(CUSTOMER_URL,
        {
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            gender: gender,
            phone_number: phoneNumber,
            email: email,
            password: password,
            language: language,
            address: address,
            city_name: city,
            zip_code: zipCode,
            country: country
        },
    )
}
const postManager = async (first_name, last_name, birth_date, gender, phoneNumber, email, password, language, address, city, zipCode, country) => {
    await axios.post(MANAGER_URL,
        {
            firstname: first_name,
            lastname: last_name,
            birthdate: birth_date,
            gender: gender,
            phonenumber: phoneNumber,
            email: email,
            password: password,
            language: language,
            address: address,
            city_name: city,
            zip_code: zipCode,
            country: country
        },
        {headers: getHeader()})
}
const updateCustomer = async (email, first_name, last_name, birth_date, gender, phoneNumber, newEmail, password, language, address, city, zipCode, country) => {
    await axios.patch(CUSTOMER_URL,
        {
            email: email,
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            gender: gender,
            phone_number: phoneNumber,
            newEmail: email,
            password: password,
            language: language,
            address: address,
            city_name: city,
            zip_code: zipCode,
            country: country
        },
        {headers: getHeader()})
}
const deleteCustomerByEmail = async (email) => {
    const rep = await axios.delete(CUSTOMER_URL,{
        headers: getHeader(),
        data: {
            email: email
        }
    });

    return rep.data;
};

const postAdmin = async (email, password) => {
    await axios.post(ADMIN_URL,
        {
            email: email,
            password: password
        },
        {headers: getHeader()})
}
const getCustomerCourses = async (email) => {
    const rep = await axios.get(COURSE_CUSTOMER_URL+ "customer/" + email,
        {headers: getHeader()});
    console.log(rep);
    return rep.data;
};
const getCustomerSportHalls = async (email) => {
    const rep = await axios.get(SPORTHALL_CUSTOMER_URL + "customer/" + email,
        {headers: getHeader()});

    return rep.data;

};

export {connexion, getSportHalls, getSportHallById, postSportHall, updateSportHall, deleteSportHallById, getCourses, getCourseById, postCourse, updateCourse, deleteCourseById, getCourseCustomers, getSportHallCustomers, getRooms, getRoomById, postRoom, updateRoom, deleteRoomById, getCustomers, getCustomerByEmail, postCustomer, postManager, updateCustomer, deleteCustomerByEmail, postAdmin, getCustomerCourses, getCustomerSportHalls};