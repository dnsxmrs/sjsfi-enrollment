'use client';

import React, { useState, useEffect } from 'react';
import { Search, Edit, ChevronDown } from 'lucide-react';
import { getStudents } from '@/app/_actions/getStudents';

interface Student {
    id: string;
    firstName: string;
    lastName: string;
    gradeLevel: string;
    strand: string;
    status: string;
    email: string;
    studentNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    guardianName?: string;
    guardianContact?: string;
    address?: string;
}

const tabs = [
    { id: 'personal', label: 'Personal Data', color: 'bg-red-800 text-white' },
    { id: 'health', label: 'Health History', color: 'bg-red-800 text-white' },
    { id: 'family', label: 'Family History', color: 'bg-red-800 text-white' },
    { id: 'familyBg', label: 'Family Background', color: 'bg-red-800 text-white' },
    { id: 'education', label: 'Educational Background', color: 'bg-red-800 text-white' },
];

export default function StudentInformationPage() {
    const [activeTab, setActiveTab] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.studentNumber && student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleStudentSelect = (student: Student) => {
        setSelectedStudent(student);
        // setSearchTerm(student.name);
    };

    const renderPersonalData = () => {
        if (!selectedStudent) {
            return (
                <div className="flex items-center justify-center h-64 text-gray-500">
                    <p>Please select a student to view their information</p>
                </div>
            );
        }

        return (
            <div className="p-6 space-y-6">
                {/* Student Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Student Number
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.studentNumber || selectedStudent.id}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Grade Level
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.gradeLevel}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.gender || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.email}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Birth
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.dateOfBirth || 'Not specified'}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedStudent.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedStudent.status}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.address || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guardian Information */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Guardian Name
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.guardianName || 'Not specified'}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Guardian Contact
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                <p className="text-gray-900">{selectedStudent.guardianContact || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return renderPersonalData();
            case 'health':
                return (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                        <p>Health History information will be displayed here</p>
                    </div>
                );
            case 'family':
                return (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                        <p>Family History information will be displayed here</p>
                    </div>
                );
            case 'familyBg':
                return (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                        <p>Family Background information will be displayed here</p>
                    </div>
                );
            case 'education':
                return (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                        <p>Educational Background information will be displayed here</p>
                    </div>
                );
            default:
                return renderPersonalData();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex h-screen">
                {/* Left Sidebar - Students List */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    {/* Search Header */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <div className="flex items-center">
                                <Search className="w-4 h-4 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Find Student"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                    }}
                                    className="flex-1 border-none outline-none text-sm text-black placeholder-gray-500"
                                />
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Students Section */}
                    <div className="flex-1 overflow-hidden">
                        <h2 className="px-4 py-3 text-sm font-medium text-red-800 border-b border-gray-200">
                            Students
                        </h2>

                        {/* Students List */}
                        <div className="flex-1 overflow-y-auto">
                            {isLoading ? (
                                <div className="p-4 text-center text-gray-500">Loading students...</div>
                            ) : filteredStudents.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">No students found</div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {filteredStudents.map((student) => (
                                        <div
                                            key={student.id}
                                            onClick={() => handleStudentSelect(student)}
                                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedStudent?.id === student.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                                                }`}
                                        >
                                            <div className="text-sm font-medium text-gray-900">
                                                {student.firstName} {student.lastName}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {student.gradeLevel} • {student.studentNumber || student.id}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Tab Navigation */}
                    <div className="flex items-center justify-between border-b border-gray-200">
                        <div className="flex">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'bg-yellow-400 text-black border-b-2 border-transparent'
                                        : 'bg-red-800 text-white hover:bg-red-700 border-b-2 border-transparent'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Edit Button */}
                        <div className="pr-6">
                            <button
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Edit Student Information"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}