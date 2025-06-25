// app/components/registrar/StatsCards.tsx
import { getActiveStudents } from "@/app/_actions/getActiveStudents";
import { getActiveSubjects } from "@/app/_actions/getActiveSubjects";

export default async function StatsCards() {
    // Fetch active students count
    const activeStudentsResult = await getActiveStudents();
    const activeStudentCount = activeStudentsResult.success ? activeStudentsResult.count : 0;

    const activeSubjectsResult = await getActiveSubjects();
    const activeSubjectCount = activeSubjectsResult.success ? activeSubjectsResult.count : 0;

    const stats = [
        { label: "Total Active Students", value: activeStudentCount },
        { label: "Pending Registrations", value: 0 },
        { label: "Withdrawal Requests", value: 0 },
        { label: "Active Courses", value: activeSubjectCount },
    ];

    return (
        <>
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white p-4 rounded shadow-sm border border-gray-200 overflow-hidden"
                >
                    <p className="text-sm text-gray-600 break-words leading-tight mb-1">
                        {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 break-words leading-tight">
                        {stat.value}
                    </p>
                </div>
            ))}
        </>
    );
}