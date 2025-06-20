/**
 * Represents a notification in the system
 * @interface Notification
 */
export interface Notification {
    /** Date when the notification was created */
    date: string
    /** Title of the notification */
    title: string
    /** Detailed description of the notification */
    description: string
}

/**
 * Type for creating a new notification
 */
export type CreateNotification = Omit<Notification, 'date'>

/**
 * Type for updating a notification
 */
export type UpdateNotification = Partial<Omit<Notification, 'date'>> & { date: string }

/**
 * Validation errors for Notification
 */
export interface NotificationValidationErrors {
    title?: string
    description?: string
    date?: string
}

/**
 * Validates a notification
 * @param notification The notification to validate
 * @returns An object containing validation errors, if any
 */
export function validateNotification(notification: CreateNotification): NotificationValidationErrors {
    const errors: NotificationValidationErrors = {}

    // Validate title
    if (!notification.title) {
        errors.title = 'Title is required'
    } else if (notification.title.length < 3) {
        errors.title = 'Title must be at least 3 characters long'
    } else if (notification.title.length > 100) {
        errors.title = 'Title must be less than 100 characters'
    }

    // Validate description
    if (!notification.description) {
        errors.description = 'Description is required'
    } else if (notification.description.length < 10) {
        errors.description = 'Description must be at least 10 characters long'
    } else if (notification.description.length > 1000) {
        errors.description = 'Description must be less than 1000 characters'
    }

    return errors
}

/**
 * Checks if a notification is valid
 * @param notification The notification to validate
 * @returns true if the notification is valid, false otherwise
 */
export function isValidNotification(notification: CreateNotification): boolean {
    const errors = validateNotification(notification)
    return Object.keys(errors).length === 0
}

/**
 * Formats a date string to a consistent format
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatNotificationDate(date: string): string {
    try {
        const dateObj = new Date(date)
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    } catch {
        // console.error('Invalid date format:', error)
        return date
    }
}

/**
 * Validates if a date string is in a valid format
 * @param date The date string to validate
 * @returns true if the date format is valid, false otherwise
 */
export function isValidDateFormat(date: string): boolean {
    const dateObj = new Date(date)
    return dateObj instanceof Date && !isNaN(dateObj.getTime())
}