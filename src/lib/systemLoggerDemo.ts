// /**
//  * System Logger Demo
//  * 
//  * This file demonstrates how to use the system logger throughout your application.
//  * You can import and use these patterns in your actual actions and API routes.
//  */

// import { logSystemAction } from '@/lib/systemLogger';
// import {
//     logRegistrationEvent,
//     logAuthEvent,
//     logAcademicTermEvent,
//     logUserEvent,
//     logSecurityEvent,
//     logWithTiming,
//     logDatabaseChange
// } from '@/lib/systemLoggerHelpers';

// // Example 1: Basic system action logging
// async function demoBasicLogging() {
//     await logSystemAction({
//         userId: 1,
//         userName: 'Admin User',
//         userRole: 'ADMIN',
//         actionCategory: 'SYSTEM',
//         actionType: 'VIEW',
//         actionDescription: 'Viewed system dashboard',
//         targetType: 'DASHBOARD',
//         targetId: 'main',
//         status: 'SUCCESS',
//         severityLevel: 'LOW'
//     });
// }

// // Example 2: Authentication logging
// async function demoAuthLogging() {
//     // Successful login
//     await logAuthEvent({
//         userId: 123,
//         userName: 'john.doe@email.com',
//         userRole: 'STUDENT',
//         actionType: 'LOGIN',
//         success: true,
//         metadata: {
//             loginMethod: 'email',
//             deviceType: 'desktop'
//         }
//     });

//     // Failed login
//     await logAuthEvent({
//         userName: 'suspicious@email.com',
//         actionType: 'FAILED_LOGIN',
//         success: false,
//         errorMessage: 'Invalid credentials'
//     });
// }

// // Example 3: Registration process logging
// async function demoRegistrationLogging() {
//     // New registration created
//     await logRegistrationEvent({
//         actionType: 'CREATE',
//         registrationId: '12345',
//         studentName: 'Jane Smith',
//         newValues: {
//             studentNo: 'STU-2024-0001',
//             yearLevel: 'Grade 7',
//             status: 'PENDING'
//         },
//         success: true,
//         userName: 'Registrar User',
//         userRole: 'REGISTRAR'
//     });

//     // Registration approved
//     await logRegistrationEvent({
//         actionType: 'UPDATE',
//         actionSubType: 'APPROVE',
//         registrationId: '12345',
//         studentName: 'Jane Smith',
//         oldValues: { status: 'PENDING' },
//         newValues: { status: 'APPROVED', approvedBy: 'Admin' },
//         success: true,
//         userName: 'Admin User',
//         userRole: 'ADMIN'
//     });

//     // Registration rejected
//     await logRegistrationEvent({
//         actionType: 'UPDATE',
//         actionSubType: 'REJECT',
//         registrationId: '12346',
//         studentName: 'John Doe',
//         oldValues: { status: 'PENDING' },
//         newValues: { status: 'REJECTED', reason: 'Incomplete documents' },
//         success: true,
//         userName: 'Registrar User',
//         userRole: 'REGISTRAR'
//     });
// }

// // Example 4: Academic term management
// async function demoAcademicTermLogging() {
//     // Create new academic term
//     await logAcademicTermEvent({
//         actionType: 'CREATE',
//         termId: '2024-2025',
//         termName: 'School Year 2024-2025',
//         newValues: {
//             year: '2024-2025',
//             startDate: '2024-08-01',
//             endDate: '2025-05-31',
//             status: 'ACTIVE'
//         },
//         success: true,
//         userName: 'Admin User',
//         userRole: 'ADMIN'
//     });

//     // Update term status
//     await logAcademicTermEvent({
//         actionType: 'UPDATE',
//         actionSubType: 'STATUS_CHANGE',
//         termId: '2023-2024',
//         termName: 'School Year 2023-2024',
//         oldValues: { status: 'ACTIVE' },
//         newValues: { status: 'ARCHIVED' },
//         success: true,
//         userName: 'Admin User',
//         userRole: 'ADMIN'
//     });
// }

// // Example 5: User management
// async function demoUserLogging() {
//     // Create new user
//     await logUserEvent({
//         actionType: 'CREATE',
//         targetUserId: '456',
//         targetUserName: 'New Teacher',
//         newValues: {
//             email: 'teacher@school.edu',
//             role: 'TEACHER',
//             status: 'ACTIVE'
//         },
//         success: true,
//         userName: 'Admin User',
//         userRole: 'ADMIN'
//     });

//     // Role change
//     await logUserEvent({
//         actionType: 'UPDATE',
//         actionSubType: 'ROLE_CHANGE',
//         targetUserId: '456',
//         targetUserName: 'New Teacher',
//         oldValues: { role: 'TEACHER' },
//         newValues: { role: 'ADMIN' },
//         success: true,
//         userName: 'Super Admin',
//         userRole: 'ADMIN'
//     });
// }

// // Example 6: Security events
// async function demoSecurityLogging() {
//     // Brute force attempt
//     await logSecurityEvent({
//         actionType: 'BRUTE_FORCE',
//         description: 'Multiple failed login attempts detected',
//         targetType: 'USER',
//         targetId: 'suspicious@email.com',
//         metadata: {
//             attemptCount: 10,
//             timeFrame: '5 minutes',
//             ipAddress: '192.168.1.100'
//         }
//     });

//     // Unauthorized access attempt
//     await logSecurityEvent({
//         userId: 123,
//         userName: 'student@school.edu',
//         actionType: 'UNAUTHORIZED_ACCESS',
//         description: 'Student attempted to access admin panel',
//         targetType: 'ADMIN_PANEL',
//         targetId: 'dashboard',
//         metadata: {
//             attemptedUrl: '/admin/dashboard',
//             userRole: 'STUDENT'
//         }
//     });

//     // Suspicious activity
//     await logSecurityEvent({
//         actionType: 'SUSPICIOUS_ACTIVITY',
//         description: 'Unusual data export pattern detected',
//         targetType: 'DATA_EXPORT',
//         targetId: 'student_records',
//         metadata: {
//             exportSize: '50000 records',
//             timeOfDay: '3:00 AM',
//             frequency: 'Multiple times'
//         }
//     });
// }

// // Example 7: Performance monitoring with timing
// async function demoPerformanceLogging() {
//     // Wrap a database operation with timing
//     const result = await logWithTiming(
//         async () => {
//             // Simulate a database operation
//             await new Promise(resolve => setTimeout(resolve, 100));
//             return { id: 1, name: 'Test Record' };
//         },
//         {
//             userId: 1,
//             userName: 'Admin',
//             userRole: 'ADMIN',
//             actionCategory: 'SYSTEM',
//             actionType: 'CREATE',
//             actionDescription: 'Created test record with performance monitoring',
//             targetType: 'TEST_RECORD',
//             targetId: '1',
//             severityLevel: 'LOW'
//         }
//     );

//     console.log('Operation result:', result);
// }

// // Example 8: Database change tracking
// async function demoDatabaseChangeLogging() {
//     // This would typically be used with real Prisma operations
//     const simulatedUpdate = await logDatabaseChange(
//         async () => {
//             // Simulate updating a record
//             return {
//                 id: 1,
//                 name: 'Updated Record',
//                 status: 'ACTIVE',
//                 updatedAt: new Date()
//             };
//         },
//         {
//             userId: 1,
//             userName: 'Admin',
//             userRole: 'ADMIN',
//             actionType: 'UPDATE',
//             targetType: 'STUDENT',
//             targetId: '1',
//             targetName: 'John Doe',
//             oldValues: {
//                 name: 'Original Record',
//                 status: 'INACTIVE'
//             },
//             severityLevel: 'MEDIUM'
//         }
//     );

//     console.log('Database operation result:', simulatedUpdate);
// }

// // Example 9: Complex transaction logging
// async function demoComplexTransactionLogging() {
//     const startTime = Date.now();

//     try {
//         // Simulate a complex operation with multiple steps
//         await logSystemAction({
//             actionCategory: 'REGISTRATION',
//             actionType: 'CREATE',
//             actionDescription: 'Started complex registration process',
//             targetType: 'REGISTRATION',
//             targetId: 'BATCH-001',
//             status: 'SUCCESS',
//             severityLevel: 'MEDIUM',
//             metadata: {
//                 operation: 'batch_registration',
//                 step: 'start'
//             }
//         });

//         // Simulate processing steps...
//         await new Promise(resolve => setTimeout(resolve, 50));

//         // Log completion
//         await logSystemAction({
//             actionCategory: 'REGISTRATION',
//             actionType: 'CREATE',
//             actionDescription: 'Completed complex registration process',
//             targetType: 'REGISTRATION',
//             targetId: 'BATCH-001',
//             status: 'SUCCESS',
//             severityLevel: 'MEDIUM',
//             executionTimeMs: Date.now() - startTime,
//             metadata: {
//                 operation: 'batch_registration',
//                 step: 'complete',
//                 recordsProcessed: 25
//             }
//         });

//     } catch (error) {
//         // Log failure
//         await logSystemAction({
//             actionCategory: 'REGISTRATION',
//             actionType: 'CREATE',
//             actionDescription: 'Failed complex registration process',
//             targetType: 'REGISTRATION',
//             targetId: 'BATCH-001',
//             status: 'FAILED',
//             errorMessage: error instanceof Error ? error.message : 'Unknown error',
//             severityLevel: 'HIGH',
//             executionTimeMs: Date.now() - startTime,
//             metadata: {
//                 operation: 'batch_registration',
//                 step: 'failed'
//             }
//         });

//         throw error;
//     }
// }

// // Example usage in a typical server action
// async function exampleServerAction(userId: number, data: any) {
//     const startTime = Date.now();

//     try {
//         // Your business logic here
//         const result = await performBusinessLogic(data);

//         // Log successful operation
//         await logSystemAction({
//             userId,
//             userName: 'Current User', // Get from session
//             userRole: 'ADMIN', // Get from session
//             actionCategory: 'SYSTEM',
//             actionType: 'UPDATE',
//             actionDescription: 'Updated system configuration',
//             targetType: 'CONFIG',
//             targetId: 'system',
//             status: 'SUCCESS',
//             severityLevel: 'HIGH',
//             executionTimeMs: Date.now() - startTime,
//             metadata: {
//                 configType: 'system_settings',
//                 changes: Object.keys(data)
//             }
//         });

//         return result;

//     } catch (error) {
//         // Log failed operation
//         await logSystemAction({
//             userId,
//             userName: 'Current User',
//             userRole: 'ADMIN',
//             actionCategory: 'SYSTEM',
//             actionType: 'UPDATE',
//             actionDescription: 'Failed to update system configuration',
//             targetType: 'CONFIG',
//             targetId: 'system',
//             status: 'FAILED',
//             errorMessage: error instanceof Error ? error.message : 'Unknown error',
//             severityLevel: 'CRITICAL',
//             executionTimeMs: Date.now() - startTime
//         });

//         throw error;
//     }
// }

// // Mock function for demonstration
// async function performBusinessLogic(data: any) {
//     // Simulate business logic
//     return { success: true, data };
// }

// export {
//     demoBasicLogging,
//     demoAuthLogging,
//     demoRegistrationLogging,
//     demoAcademicTermLogging,
//     demoUserLogging,
//     demoSecurityLogging,
//     demoPerformanceLogging,
//     demoDatabaseChangeLogging,
//     demoComplexTransactionLogging,
//     exampleServerAction
// };
