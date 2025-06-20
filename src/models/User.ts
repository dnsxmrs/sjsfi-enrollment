// Base User interface
export interface BaseUser {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'ADMIN' | 'FACULTY' | 'REGISTRAR' | 'CASHIER';
    createdAt: Date;
    updatedAt: Date;
}

// Student-specific interface
export interface Student extends BaseUser {
    role: 'STUDENT';
    studentNo: string;
    schoolYear: string;
    course: string;
    yearLevel: number;
    section?: string;
}

// Admin-specific interface
export interface Admin extends BaseUser {
    role: 'ADMIN';
    position: string;
    department?: string;
}

// Faculty-specific interface
export interface Faculty extends BaseUser {
    role: 'FACULTY';
    employeeNo: string;
    department: string;
    position: string;
}

// Union type for all possible user types
export type User = Student | Admin | Faculty;

// Type guards for role checking
export function isStudent(user: User): user is Student {
    return user.role === 'STUDENT';
}

export function isAdmin(user: User): user is Admin {
    return user.role === 'ADMIN';
}

export function isFaculty(user: User): user is Faculty {
    return user.role === 'FACULTY';
}

// Input types for creating users
export type CreateBaseUserInput = {
    email: string;
    password: string;
    name: string;
    role: 'STUDENT' | 'ADMIN' | 'FACULTY' | 'REGISTRAR' | 'CASHIER';
};

export type CreateStudentInput = CreateBaseUserInput & {
    role: 'STUDENT';
    studentNo: string;
    schoolYear: string;
    course: string;
    yearLevel: number;
    section?: string;
};

export type CreateAdminInput = CreateBaseUserInput & {
    role: 'ADMIN';
    position: string;
    department?: string;
};

export type CreateFacultyInput = CreateBaseUserInput & {
    role: 'FACULTY';
    employeeNo: string;
    department: string;
    position: string;
};

export type CreateUserInput = CreateStudentInput | CreateAdminInput | CreateFacultyInput;

export type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

// Helper function to create a new user
export function createUser(input: CreateUserInput): User {
    const now = new Date();
    return {
        id: crypto.randomUUID(),
        ...input,
        createdAt: now,
        updatedAt: now
    };
}

// Helper function to update a user
export function updateUser(user: User, input: UpdateUserInput): User {
    const { role, ...updateData } = input;
    return {
        ...role ? { role } : {},
        ...user,
        ...updateData,
        updatedAt: new Date()
    };
} 