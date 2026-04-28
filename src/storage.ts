type KeysLocalStorage = "dashboard" | "workouts" | "students" | "instructors"

class Storage {
    constructor() {};

    get(key: KeysLocalStorage) {
        return key;
    };

};