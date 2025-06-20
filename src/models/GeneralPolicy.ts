/**
 * Represents a general policy in the system
 * @interface GeneralPolicy
 */
export interface GeneralPolicy {
    /** Title of the policy */
    title: string
    /** Detailed description of the policy */
    description: string
    /** Date when the policy was last updated */
    lastUpdated: string
}

/**
 * Type for creating a new policy
 */
export type CreatePolicy = Omit<GeneralPolicy, 'lastUpdated'>

/**
 * Type for updating a policy
 */
export type UpdatePolicy = Partial<Omit<GeneralPolicy, 'lastUpdated'>> & { lastUpdated: string }

/**
 * Validation errors for Policy
 */
export interface PolicyValidationErrors {
    title?: string
    description?: string
    lastUpdated?: string
}

/**
 * Validates a policy
 * @param policy The policy to validate
 * @returns An object containing validation errors, if any
 */
export function validatePolicy(policy: CreatePolicy): PolicyValidationErrors {
    const errors: PolicyValidationErrors = {}

    // Validate title
    if (!policy.title) {
        errors.title = 'Title is required'
    } else if (policy.title.length < 3) {
        errors.title = 'Title must be at least 3 characters long'
    } else if (policy.title.length > 100) {
        errors.title = 'Title must be less than 100 characters'
    }

    // Validate description
    if (!policy.description) {
        errors.description = 'Description is required'
    } else if (policy.description.length < 10) {
        errors.description = 'Description must be at least 10 characters long'
    } else if (policy.description.length > 2000) {
        errors.description = 'Description must be less than 2000 characters'
    }

    return errors
}

/**
 * Checks if a policy is valid
 * @param policy The policy to validate
 * @returns true if the policy is valid, false otherwise
 */
export function isValidPolicy(policy: CreatePolicy): boolean {
    const errors = validatePolicy(policy)
    return Object.keys(errors).length === 0
}

/**
 * Formats a date string to a consistent format
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatPolicyDate(date: string): string {
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