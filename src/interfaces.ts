export interface DashboardType {
    totalWorkouts: number;
    totalStudents: number;
    totalInstructors: number;
};

export interface StudentType {
    register: string;
    name: string;
    cpf: string;
    telephone: string;
    plan: string;
}

export interface InstructorType {
    name: string;
    cpf: string;
    telephone: string;
    specialty: string;
};

export interface WorkoutType {
    student: string;
    instructor: string;
    workout: string;
    date: string;
    time: string;
}