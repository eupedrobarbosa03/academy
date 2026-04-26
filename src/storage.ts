enum GetterStorage {
    dashboard = "dashboard",
    workouts = "workouts",
    students = "students",
    instructors = "instructors"
}

class Storage {
    constructor() {};

    dashboard(key: GetterStorage.dashboard) {};
    workouts(key: GetterStorage.workouts) {};
    students(key: GetterStorage.students) {};
    instructors(key: GetterStorage.instructors) {};

};