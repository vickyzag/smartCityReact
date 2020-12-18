import {
    connexion,
    getSportHalls,
    getSportHallById,
    postSportHall,
    deleteSportHallById,
    updateSportHall,
    getCourses,
    getCourseById,
    postCourse,
    updateCourse,
    deleteCourseById,
    getCourseCustomers,
    getSportHallCustomers,
    getRooms,
    getRoomById,
    updateRoom,
    postRoom,
    deleteRoomById
} from './http';

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
const loadCourses = async () => {
    try {
        const data = await getCourses();
        const courses = []
        for (const course of data) {
            courses.push(
                {
                    courseId: course.id,
                    sport_hall: course.sportHall,
                    id_room: course.room.id_room,
                    starting_date_time: course.starting_date_time,
                    ending_date_time: course.ending_date_time,
                    level: course.level,
                    activity: course.activity,
                    instructor: (course.instructor?course.instructor.last_name +" "+ course.instructor.first_name+" ("+ course.instructor.email+")":"No instructor"),
                }
            )
        }
        return courses;
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}
const addCourse = async (sportHall, room, startingDateTime, endingDateTime, level, activity, instructor) => {
    try {
        await postCourse(sportHall, room, startingDateTime, endingDateTime, level, activity, instructor);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}
const modifyCourse = async (id, sportHall, room, startingDateTime, endingDateTime, level, activity, instructor) => {
    try {

        await updateCourse(id, sportHall, room, startingDateTime, endingDateTime, level, activity, instructor);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}
const loadCourse = async (courseId) => {
    try {
        const data = await getCourseById(courseId);
        return {
            courseId: data.id,
            id_sport_hall: data.sportHall.id_sport_hall,
            id_room: data.room.id_room,
            starting_date_time: data.starting_date_time,
            ending_date_time: data.ending_date_time,
            level: data.level,
            activity: data.activity,
            instructor: data.instructor.email,

        };
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};
const loadCourseCustomers = async (courseId) => {
    try {
        const data = await getCourseCustomers(courseId);
        const customers = [];
        for (const customer of data) {
            customers.push(
                {
                    first_name: customer.customer.first_name,
                    last_name: customer.customer.last_name,
                    email: customer.customer.email,
                }
            )

        }
        return customers;

    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};
const loadSportHallCustomers = async (sportHallId) => {
    try {
        const data = await getSportHallCustomers(sportHallId);
        const customers = [];
        for (const customer of data) {
            customers.push(
                {
                    first_name: customer.customer.first_name,
                    last_name: customer.customer.last_name,
                    email: customer.customer.email,
                }
            )

        }
        return customers;

    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};
const deleteCourse = async (courseId) => {
    try {
        await deleteCourseById(courseId);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};
const loadRooms = async () => {
    try {
        const data = await getRooms();
        const rooms = []
        for (const room of data) {
            rooms.push(
                {
                    id_room: room.id_room,
                    id_sport_hall: room.id_sport_hall,
                    max_capacity: room.max_capacity,
                }
            )
        }
        return rooms;
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}
const loadRoom = async (id_room, id_sport_hall) => {
    try {
        const data = await getRoomById(id_room, id_sport_hall);
        return {
            id_room: data.id_room,
            id_sport_hall: data.id_sport_hall,
            max_capacity: data.manager.max_capacity,
        };
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};
const addRoom = async (id_room, id_sport_hall, max_capacity) => {
    try {
        await postRoom(id_room, id_sport_hall, max_capacity);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}
const modifyRoom = async (id_room, id_sport_hall, max_capacity) => {
    try {
        await updateRoom(id_room, id_sport_hall, max_capacity);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
}
const deleteRoom = async (id_room, id_sport_hall) => {
    try {
        await deleteRoomById(id_room, id_sport_hall);
    } catch (e) {
        throw new Error("Something went wrong, try again later "+e.toString());
    }
};

export {login, loadSportHalls, loadSportHall, addSportHall, modifySportHall, deleteSportHall, loadCourses, addCourse, modifyCourse, loadCourse, deleteCourse, loadCourseCustomers, loadSportHallCustomers, loadRooms, loadRoom, addRoom, modifyRoom, deleteRoom};