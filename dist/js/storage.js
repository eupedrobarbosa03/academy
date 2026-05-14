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
        }
        ;
        localStorage.setItem(key, JSON.stringify([]));
    }
    ;
}
;
class Storage {
    constructor() { }
    ;
    get(key) {
        const storage = localStorage.getItem(key);
        return storage ? JSON.parse(storage) : null;
    }
    ;
}
;
export const storage = new Storage();
