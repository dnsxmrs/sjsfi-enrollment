'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Trash, Copy, Check, X, Mail } from 'lucide-react';
import { getStudents } from '@/app/_actions/getStudents';
import { sendMissingRequirementsNotification, getMissingRequirements } from '@/app/_actions/sendNotification';
import { generateRegistrationCode, generateRegistrationCodeForRegistration } from '@/app/_actions/generateCode';
import toast from 'react-hot-toast';
import { approveRegistration } from '@/app/_actions/approveRegistration';

const RegisterCoursePage: React.FC = () => {
    const [studentID, setStudentID] = useState('');
    const [fullName, setFullName] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // This will hold the registration status
    const [isLoading, setIsLoading] = useState(true);
    const [isNotificationLoading, setIsNotificationLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string>('');
    const [isCodeCopied, setIsCodeCopied] = useState(false);
    const [isGeneratingCode, setIsGeneratingCode] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedRegistrationId, setSelectedRegistrationId] = useState<number | null>(null);
    const [modalData, setModalData] = useState<{
        fullName: string;
        email: string;
        missingReqs: string[];
    }>({ fullName: '', email: '', missingReqs: [] });

    const [students, setStudents] = useState<Array<{
        id: string;
        registrationId: number;
        firstName: string;
        familyName: string;
        gradeLevel: string;
        status: string;
        email: string;
    }>>([]);

    const [requirements, setRequirements] = useState({
        birthCertificate: false,
        f137: false,
        f138: false,
        goodMoral: false,
        privacyForm: false,
    });


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

    const handleRegister = async () => {
        if (!selectedRegistrationId) {
            toast.error('No registration selected.');
            return;
        }
        try {
            const result = await approveRegistration(selectedRegistrationId);
// generateApplicationCode

            if (result.success && result.code) {
                setGeneratedCode(result.code);
                toast.success(`Registration Code Generated: ${result.code}`, {
                    duration: 5000,
                });
                setStatus('APPROVED'); // Update status to APPROVED

            } else {
                toast.error(`Failed to generate registration code: ${result.error || 'Unknown error occurred'}`);
            }

        } catch {
            toast.error('An error occurred while generating the registration code. Please try again.');
        }
    };

    const handleGenerateRegistration = async () => {
        setIsGeneratingCode(true);
        setGeneratedCode('');
        setIsCodeCopied(false);

        try {
            const result = await generateRegistrationCode();

            if (result.success && result.code) {
                setGeneratedCode(result.code);

                // Show success alert with the generated code
                // alert(`✅ Registration Code Generated Successfully!\n\nCode: ${result.code}\n\nThis code is unique and can only be used once for registration.\nPlease provide this code to the student to access the registration form.`);
                toast.success(`Registration Code Generated: ${result.code}`, {
                    duration: 5000,
                });
            } else {
                toast.error(`Failed to generate registration code: ${result.error || 'Unknown error occurred'}`);
            }
        } catch (error) {
            console.error('Error generating registration code:', error);
            toast.error('An error occurred while generating the registration code. Please try again.');
        } finally {
            setIsGeneratingCode(false);
        }
    };

    const handleCopyCode = async () => {
        if (generatedCode) {
            try {
                await navigator.clipboard.writeText(generatedCode);
                setIsCodeCopied(true);
                setTimeout(() => setIsCodeCopied(false), 2000); // Reset after 2 seconds
            } catch {
                // Fallback for browsers that don't support clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = generatedCode;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                setIsCodeCopied(true);
                setTimeout(() => setIsCodeCopied(false), 2000);
            }
        }
    };

    const handleNotify = async () => {
        // Check if a student is selected
        if (!studentID || !fullName || !email) {
            toast.error('Please select a student first by clicking the View button in the table');
            return;
        }

        // Check if there are missing requirements
        const missingReqs = await getMissingRequirements(requirements);
        if (missingReqs.length === 0) {
            toast('This student has submitted all requirements. No notification needed.');
            return;
        }

        // down -- make this a modal
        setModalData({
            fullName,
            email,
            missingReqs
        });
        setShowConfirmModal(true);
    };

    const handleRejectRegistration = async () => {
        if (!selectedRegistrationId) {
            toast.error('No registration selected.');
            return;
        }
        try {
            const result = await rejectRegistration(selectedRegistrationId);
            // generateApplicationCode
            if (result.success) {
                toast.success(`Registration rejected for ${fullName}`);
            } else {
                toast.error(`Failed to reject registration: ${result.error || 'Unknown error occurred'}`);
            }
        } catch (error) {
            console.error('Error rejecting registration:', error);
            toast.error('An error occurred while rejecting the registration. Please try again.');
        }

        // Show rejection modal
        setShowRejectModal(true);
    };

    const handleConfirmReject = async () => {
        setShowRejectModal(false);

        try {
            // You'll need to create this action function
            // const result = await rejectRegistration(selectedRegistrationId);

            // For now, just show a success message
            toast.success(`Registration rejected for ${fullName}`);

            // Clear the form after rejection
            setStudentID('');
            setFullName('');
            setGradeLevel('');
            setEmail('');
            setStatus('');
            setSelectedRegistrationId(null);
            setRequirements({
                birthCertificate: false,
                f137: false,
                f138: false,
                goodMoral: false,
                privacyForm: false,
            });

            // Refresh the students list
            const result = await getStudents();
            if (result.success) {
                setStudents(result.students);
            }
        } catch (error) {
            console.error('Error rejecting registration:', error);
            toast.error('Failed to reject registration. Please try again.');
        }
    };

    const handleConfirmSend = async () => {
        setShowConfirmModal(false);
        setIsNotificationLoading(true);

        try {
            const result = await sendMissingRequirementsNotification({
                studentId: studentID,
                studentName: modalData.fullName,
                email: modalData.email,
                missingRequirements: modalData.missingReqs,
                notificationMethod: 'email' // For now, we'll just send email
            });

            if (result.success) {
                toast.success(`Email notification sent successfully to ${modalData.email}!\n\n${result.message}`);
            } else {
                toast.error(`Failed to send notification:\n${result.error || result.message}\n\nPlease check your email configuration.`);
            }
        } catch {
            toast.error('An error occurred while sending the notification. Please try again or check the console for details.');
        } finally {
            setIsNotificationLoading(false);
        }
        // up --
    };

    const handleViewStudent = (student: {
        id: string;
        registrationId: number;
        firstName: string;
        familyName: string;
        gradeLevel: string;
        status: string;
        email: string;
    }) => {
        // Populate form fields with student data
        setStudentID(student.id);
        setFullName(student.firstName + ' ' + student.familyName);
        setGradeLevel(student.gradeLevel);
        setEmail(student.email);
        setStatus(student.status);
        setSelectedRegistrationId(student.registrationId);

        // For requirements, we'll set them to false as default since we don't have this data
        // You can modify this logic based on your actual data structure
        setRequirements({
            birthCertificate: false,
            f137: false,
            f138: true,
            goodMoral: false,
            privacyForm: false
        });
    };

    // Confirmation Modal Component
    const ConfirmationModal: React.FC = () => {
        if (!showConfirmModal) return null;

        return (
            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                                Confirm Email Notification
                            </h3>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                disabled={isNotificationLoading}
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">
                                Send missing requirements notification to <strong>{modalData.fullName}</strong>?
                            </p>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                <h4 className="font-medium text-yellow-800 mb-2">Missing Requirements:</h4>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    {modalData.missingReqs.map((req, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-blue-700">
                                    <strong>Email will be sent to:</strong> {modalData.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                disabled={isNotificationLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmSend}
                                disabled={isNotificationLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                {isNotificationLoading ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-4 h-4" />
                                        <span>Send Email</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Rejection Modal Component
    const RejectionModal: React.FC = () => {
        if (!showRejectModal) return null;

        return (
            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                <X className="w-5 h-5 mr-2 text-red-600" />
                                Reject Registration
                            </h3>
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-sm font-medium text-red-800">Warning</h4>
                                        <p className="text-sm text-red-700 mt-1">
                                            This action cannot be undone. The registration will be permanently rejected.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4">
                                Are you sure you want to reject the registration for <strong>{fullName}</strong>?
                            </p>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                <p className="text-sm text-gray-700">
                                    <strong>Registration ID:</strong> {studentID}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Grade Level:</strong> {gradeLevel}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Email:</strong> {email}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmReject}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                            >
                                <X className="w-4 h-4" />
                                <span>Reject Registration</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
                <aside className="w-full md:w-56 space-y-4 flex-shrink-0 order-1 md:order-2">
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3">
                        <label className="block text-sm font-medium text-black px-3">
                            Quick Access Buttons
                        </label>
                        <button
                            className="bg-red-800 text-white py-2 rounded text-sm hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            onClick={() => handleGenerateRegistration()}
                            disabled={isGeneratingCode}
                        >
                            {isGeneratingCode ? (
                                <>
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <span>Generate Registration Code</span>
                            )}
                        </button>

                        {/* Generated Code Display */}
                        {generatedCode && (
                            <div className="bg-green-50 border border-green-200 rounded p-3 space-y-2">
                                <label className="block text-xs font-medium text-green-800">
                                    Generated Code:
                                </label>
                                <div className="flex items-center space-x-2 w-full">
                                    <input
                                        type="text"
                                        value={generatedCode}
                                        readOnly
                                        className="flex-1 min-w-0 text-sm font-mono bg-white border border-green-300 rounded px-2 py-1 text-green-800 truncate"
                                    />
                                    <button
                                        onClick={handleCopyCode}
                                        className="flex-shrink-0 p-1 text-green-600 hover:text-green-800 hover:bg-green-100 rounded"
                                        title="Copy to clipboard"
                                    >
                                        {isCodeCopied ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-green-700">
                                    Provide this code to the student for registration access.
                                </p>
                            </div>
                        )}
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
                                    <th className="py-2 font-semibold">Registration ID</th>
                                    <th className="py-2 font-semibold">Full Name</th>
                                    {/* <th className="py-2 font-semibold">Last Name</th> */}
                                    <th className="py-2 font-semibold">Grade Level</th>
                                    <th className="py-2 font-semibold">Actions</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {students.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-4 text-center text-gray-500">
                                                No students found
                                            </td>
                                        </tr>
                                    ) : (
                                        students.map((student) => (
                                            <tr key={student.id} className="border-b border-gray-200 text-black hover:bg-gray-50">
                                                <td className="py-2">{student.id}</td>
                                                <td className="py-2">{student.firstName} {student.familyName}</td>
                                                {/* <td className="py-2">{student.familyName}</td> */}
                                                <td className="py-2">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                        {student.gradeLevel}
                                                    </span>
                                                </td>
                                                <td className="py-2 flex space-x-4">
                                                    <button
                                                        title="View"
                                                        className="text-gray-700 hover:text-gray-900"
                                                        onClick={() => handleViewStudent(student)}
                                                    >
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                    {/* <button
                                                        title="Delete"
                                                        className="text-red-600 hover:text-red-800"
                                                        onClick={() => toast(`Delete student ${student.id}`)}
                                                    >
                                                        <Trash className="h-5 w-5" />
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                    {/* Add/Edit Student Form */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4 text-black">
                            Registration Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black" htmlFor="studentID">
                                    Registration ID
                                </label>
                                <input
                                    id="studentID"
                                    type="text"
                                    placeholder="Enter registration ID"
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
                                <div className="w-full text-black border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100 flex items-center">
                                    {gradeLevel || 'Not selected'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black" htmlFor="status">
                                    Registration Status
                                </label>
                                <div className="w-full text-black border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100">
                                    {status || 'Not selected'}
                                </div>
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
                        {/* <div className="mb-4">
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
                                        name="f137"
                                        checked={requirements.f137}
                                        onChange={handleRequirementChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 text-sm text-black">F-137</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="f138"
                                        checked={requirements.f138}
                                        onChange={handleRequirementChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 text-sm text-black">F-138</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="goodMoral"
                                        checked={requirements.goodMoral}
                                        onChange={handleRequirementChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 text-sm text-black">Good Moral</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="privacyForm"
                                        checked={requirements.privacyForm}
                                        onChange={handleRequirementChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 text-sm text-black">Privacy Form</span>
                                </label>
                            </div>
                        </div> */}
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
                                <span>Approve Registration</span>
                            </button>
                            {/* <button
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
                            </button> */}
                            <button
                                onClick={handleRejectRegistration}
                                className="bg-gray-600 text-white px-4 py-2 rounded text-sm flex items-center space-x-2 hover:bg-gray-700"
                            >
                                <X className="w-4 h-4" />
                                <span>Reject Registration</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal />
            
            {/* Rejection Modal */}
            <RejectionModal />
        </div>
    );
};

export default RegisterCoursePage;