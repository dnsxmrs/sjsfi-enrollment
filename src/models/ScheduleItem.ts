/**
 * Represents a schedule item in the system
 * @interface ScheduleItem
 */
export interface ScheduleItem {
    /** Unique identifier for the schedule item */
    id: string
    /** Name of the subject/course */
    subject: string
    /** Time slot for the class (e.g., "8:00 AM - 9:30 AM") */
    time: string
    /** Room number or location */
    room: string
    /** Name of the instructor/professor */
    instructor: string
    /** Day of the week */
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
}

/**
 * Type for the days of the week
 */
export type DayOfWeek = ScheduleItem['day']

/**
 * Type for creating a new schedule item (without id)
 */
export type CreateScheduleItem = Omit<ScheduleItem, 'id'>

/**
 * Type for updating a schedule item (all fields optional except id)
 */
export type UpdateScheduleItem = Partial<Omit<ScheduleItem, 'id'>> & { id: string }

/**
 * Validation errors for ScheduleItem
 */
export interface ScheduleItemValidationErrors {
    subject?: string
    time?: string
    room?: string
    instructor?: string
    day?: string
}

/**
 * Validates a schedule item
 * @param item The schedule item to validate
 * @returns An object containing validation errors, if any
 */
export function validateScheduleItem(item: CreateScheduleItem): ScheduleItemValidationErrors {
    const errors: ScheduleItemValidationErrors = {}

    // Validate subject
    if (!item.subject) {
        errors.subject = 'Subject is required'
    } else if (item.subject.length < 3) {
        errors.subject = 'Subject must be at least 3 characters long'
    } else if (item.subject.length > 100) {
        errors.subject = 'Subject must be less than 100 characters'
    }

    // Validate time
    if (!item.time) {
        errors.time = 'Time is required'
    } else {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM) - ([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/
        if (!timeRegex.test(item.time)) {
            errors.time = 'Time must be in format "HH:MM AM/PM - HH:MM AM/PM"'
        }
    }

    // Validate room
    if (!item.room) {
        errors.room = 'Room is required'
    } else if (item.room.length < 2) {
        errors.room = 'Room must be at least 2 characters long'
    } else if (item.room.length > 50) {
        errors.room = 'Room must be less than 50 characters'
    }

    // Validate instructor
    if (!item.instructor) {
        errors.instructor = 'Instructor is required'
    } else if (item.instructor.length < 3) {
        errors.instructor = 'Instructor name must be at least 3 characters long'
    } else if (item.instructor.length > 100) {
        errors.instructor = 'Instructor name must be less than 100 characters'
    }

    // Validate day
    if (!item.day) {
        errors.day = 'Day is required'
    } else if (!['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(item.day)) {
        errors.day = 'Invalid day of the week'
    }

    return errors
}

/**
 * Checks if a schedule item is valid
 * @param item The schedule item to validate
 * @returns true if the item is valid, false otherwise
 */
export function isValidScheduleItem(item: CreateScheduleItem): boolean {
    const errors = validateScheduleItem(item)
    return Object.keys(errors).length === 0
}

/**
 * Validates a time string format
 * @param time The time string to validate
 * @returns true if the time format is valid, false otherwise
 */
export function isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM) - ([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/
    return timeRegex.test(time)
}

/**
 * Validates if a time slot overlaps with another time slot
 * @param time1 First time slot
 * @param time2 Second time slot
 * @returns true if the time slots overlap, false otherwise
 */
export function doTimeSlotsOverlap(time1: string, time2: string): boolean {
    const [start1, end1] = time1.split(' - ').map(t => new Date(`2000-01-01 ${t}`))
    const [start2, end2] = time2.split(' - ').map(t => new Date(`2000-01-01 ${t}`))
    
    return start1 < end2 && start2 < end1
}