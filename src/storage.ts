const keysLocalStorage = ["dashboard", "workouts", "students", "instructors"];
for (const key of keysLocalStorage) {
    if (!localStorage.getItem(key)) {
        if (key === "dashboard") {
            localStorage.setItem(key, JSON.stringify({
                totalWorkouts: 0,
                totalStudents: 0,
                totalInstructors: 0
            }));
            continue;
        };
        localStorage.setItem(key, JSON.stringify([]));
    };
};

export type KeysLocalStorage = "dashboard" | "workouts" | "students" | "instructors";

class Storage {
    constructor() {};

    get<T, K extends KeysLocalStorage>(key: K): T | null {
        const storage = localStorage.getItem(key);
        return storage ? JSON.parse(storage) as T : null;
    };

};

export const storage = new Storage();