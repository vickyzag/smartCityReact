import axios from 'axios';
import {getHeader, getAPI} from "./utils";


const SPORTHALL_URL = getAPI("sportHall/");
const COURSE_URL = getAPI("course/");
const ROOM_URL = getAPI("room/");
const LOGIN_URL = getAPI("user/login");
const CUSTOMER_COURSE_URL = getAPI("customerCourse/")
const CUSTOMER_SPORTHALL_URL = getAPI("sportHallCustomer/");

const connexion = async (email, password) => {
    try {
        const resp = await axios.post(LOGIN_URL, {
            email: email,
            password: password
        });
        console.log(resp.data);
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
    const rep = await axios.get(ROOM_URL + id_room + "-" + id_sport_hall);
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

export {connexion, getSportHalls, getSportHallById, postSportHall, updateSportHall, deleteSportHallById, getCourses, getCourseById, postCourse, updateCourse, deleteCourseById, getCourseCustomers, getSportHallCustomers, getRooms, getRoomById, postRoom, updateRoom, deleteRoomById};