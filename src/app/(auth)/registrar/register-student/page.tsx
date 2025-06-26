'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Trash } from 'lucide-react';
import { getStudents } from '@/app/_actions/getStudents';
import { sendMissingRequirementsNotification, getMissingRequirements } from '@/app/_actions/sendNotification';
import { useRouter } from 'next/navigation';

const RegisterCoursePage: React.FC = () => {
    const [studentID, setStudentID] = useState('');
    const [fullName, setFullName] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [strand, setStrand] = useState('');
    const [email, setEmail] = useState('');
    const [students, setStudents] = useState<Array<{
        id: string;
        firstName: string;
        lastName: string;
        gradeLevel: string;
        strand: string;
        status: string;
        email: string;
    }>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [requirements, setRequirements] = useState({
        birthCertificate: false,
        reportCard: false,
        certificateOfGoodMoral: false,
    });
    const [isNotificationLoading, setIsNotificationLoading] = useState(false);
    const router = useRouter();

    // Fetch students on component mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const result = await getStudents();
                if (result.success) {
                    setStudents(result.students);
                } else {
                    console.error('Failed to fetch students:', result.error);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRequirements({
            ...requirements,
            [e.target.name]: e.target.checked,
        });
    };

    const handleRegister = () => {
        // Placeholder for register student logic
        alert('Register Student clicked');
    };    const handleNotify = async () => {
        // Check if a student is selected
        if (!studentID || !fullName || !email) {
            alert('Please select a student first by clicking the View button in the table');
            return;
        }

        // Check if there are missing requirements
        const missingReqs = await getMissingRequirements(requirements);
        if (missingReqs.length === 0) {
            alert('This student has submitted all requirements. No notification needed.');
            return;
        }

        // Confirm sending notification
        const confirmSend = confirm(
            `Send missing requirements notification to ${fullName}?\n\n` +
            `Missing requirements:\n${missingReqs.map(req => `• ${req}`).join('\n')}\n\n` +
            `Email will be sent to: ${email}`
        );

        if (!confirmSend) {
            return;
        }

        setIsNotificationLoading(true);

        try {
            const result = await sendMissingRequirementsNotification({
                studentId: studentID,
                studentName: fullName,
                email: email,
                missingRequirements: missingReqs,
                notificationMethod: 'email' // For now, we'll just send email
            });

            if (result.success) {
                alert(`✅ Email notification sent successfully to ${email}!\n\n${result.message}`);
            } else {
                alert(`❌ Failed to send notification:\n${result.error || result.message}\n\nPlease check your email configuration.`);
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('❌ An error occurred while sending the notification. Please try again or check the console for details.');
        } finally {
            setIsNotificationLoading(false);
        }
    };

    const handleViewStudent = (student: {
        id: string;
        firstName: string;
        lastName: string;
        gradeLevel: string;
        strand: string;
        status: string;
        email: string;
    }) => {
        // Populate form fields with student data
        setStudentID(student.id);
        setFullName(student.firstName + ' ' + student.lastName);
        setGradeLevel(student.gradeLevel);
        setStrand(student.strand);
        setEmail(student.email);

        // For requirements, we'll set them to false as default since we don't have this data
        // You can modify this logic based on your actual data structure
        setRequirements({
            birthCertificate: false,
            reportCard: false,
            certificateOfGoodMoral: false,
        });
    };

    // const handleClearForm = () => {
    //     // Clear all form fields
    //     setStudentID('');
    //     setFullName('');
    //     setGradeLevel('');
    //     setStrand('');
    //     setEmail('');
    //     setRequirements({
    //         birthCertificate: false,
    //         reportCard: false,
    //         certificateOfGoodMoral: false,
    //     });
    // };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
                <aside className="w-full md:w-56 space-y-4 flex-shrink-0 order-1 md:order-2">
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3">
                        <label className="block text-sm font-medium text-black px-3">
                            Quick Access Buttons
                        </label>
                        <button
                            className="bg-red-800 text-white py-2 rounded text-sm hover:bg-red-900"
                            onClick={() => router.push('/registrar/register-student/Form-students')}
                        >
                            Student Application Form
                        </button>
                        <button
                            className="bg-red-800 text-white py-2 rounded text-sm hover:bg-red-900"
                            onClick={() => router.push('/registrar/register-student/Form-registration')}
                        >
                            Registration Form
                        </button>
                    </div>
                </aside>
                {/* First Column: Add Student Form + All Students Table */}
                <div className="flex-1 space-y-6 order-2 md:order-1">
                    {/* All Students Table */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4 text-black">Pending Registration</h2>
                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="text-gray-500">Loading students...</div>
                            </div>
                        ) : (
                            <table className="w-full text-left text-sm"><thead>
                                <tr className="border-b border-gray-300 text-black">
                                    <th className="py-2 font-semibold">Application ID</th>
                                    <th className="py-2 font-semibold">First Name</th>
                                    <th className="py-2 font-semibold">Last Name</th>
                                    <th className="py-2 font-semibold">Actions</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {students.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="py-4 text-center text-gray-500">
                                                No students found
                                            </td>
                                        </tr>
                                    ) : (
                                        students.map((student) => (
                                            <tr key={student.id} className="border-b border-gray-200 text-black hover:bg-gray-50">
                                                <td className="py-2">{student.id}</td>
                                                <td className="py-2">{student.firstName}</td>
                                                <td className="py-2">{student.lastName}</td>
                                                <td className="py-2 flex space-x-4">
                                                    <button
                                                        title="View"
                                                        className="text-gray-700 hover:text-gray-900"
                                                        onClick={() => handleViewStudent(student)}
                                                    >
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        title="Delete"
                                                        className="text-red-600 hover:text-red-800"
                                                        onClick={() => alert(`Delete student ${student.id}`)}
                                                    >
                                                        <Trash className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>                    {/* Add/Edit Student Form */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4 text-black">
                            Student Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black" htmlFor="studentID">
                                    Student ID
                                </label>
                                <input
                                    id="studentID"
                                    type="text"
                                    placeholder="Enter student ID"
                                    value={studentID}
                                    onChange={(e) => setStudentID(e.target.value)}
                                    readOnly
                                    className="w-full text-black border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black" htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    readOnly
                                    className="w-full text-black border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black" htmlFor="gradeLevel">
                                    Grade Level
                                </label>
                                <select
                                    id="gradeLevel"
                                    value={gradeLevel}
                                    onChange={(e) => setGradeLevel(e.target.value)}
                                    disabled
                                    className="w-full text-black border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
                                >
                                    <option value="">Select grade level</option>
                                    <option value="Grade 7">Grade 7</option>
                                    <option value="Grade 8">Grade 8</option>
                                    <option value="Grade 9">Grade 9</option>
                                    <option value="Grade 10">Grade 10</option>
                                    <option value="Grade 11">Grade 11</option>
                                    <option value="Grade 12">Grade 12</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black" htmlFor="strand">
                                    Strand
                                </label>
                                <select
                                    id="strand"
                                    value={strand}
                                    onChange={(e) => setStrand(e.target.value)}
                                    disabled
                                    className="w-full text-black border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
                                >
                                    <option value="">Select strand</option>
                                    <option value="Senior High">Senior High School</option>
                                    <option value="Junior High">Junior High School</option>
                                    <option value="Elementary">Elementary</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-black" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly
                                className="w-full text-black border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-sm font-medium mb-2 text-black">Requirements</span>
                            <div className="flex flex-col space-y-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="birthCertificate"
                                        checked={requirements.birthCertificate}
                                        onChange={handleRequirementChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 text-sm text-black">Birth Certificate</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="reportCard"
                                        checked={requirements.reportCard}
                                        onChange={handleRequirementChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 text-sm text-black">Report Card</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="certificateOfGoodMoral"
                                        checked={requirements.certificateOfGoodMoral}
                                        onChange={handleRequirementChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 text-sm text-black">Certificate of Good Moral</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleRegister}
                                className="bg-red-800 text-white px-4 py-2 rounded text-sm flex items-center space-x-2 hover:bg-red-900"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Register Student</span>
                            </button>                            <button
                                onClick={handleNotify}
                                disabled={isNotificationLoading}
                                className="bg-yellow-400 text-black px-4 py-2 rounded text-sm flex items-center space-x-2 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isNotificationLoading ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                        </svg>
                                        <span>Notify Missing Requirements</span>
                                    </>
                                )}
                            </button>
                            {/* <button
                                onClick={handleClearForm}
                                className="bg-gray-500 text-white px-4 py-2 rounded text-sm flex items-center space-x-2 hover:bg-gray-600"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>                                <span>Clear Form</span>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCoursePage;