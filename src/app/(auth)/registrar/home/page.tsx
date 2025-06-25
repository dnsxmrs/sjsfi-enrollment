import StatsCards from '@/components/registrar/StatsCards';
// import { RecentRegistrationsTable } from '@/components/registrar/RecentRegistrationTable';
// import { RecentPendingRegistrations } from '@/components/registrar/RecentPendingRegistration';
import GradePieChart from '@/components/admin/PieChart';

export default function RegistrarHomePage() {
    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCards />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-600">Students per Grade</h3>
                    <div className="w-full overflow-hidden">
                        <GradePieChart />
                    </div>
                </div>
                {/* <RecentRegistrationsTable />
                <RecentPendingRegistrations /> */}
            </div>
        </div>

    );
}