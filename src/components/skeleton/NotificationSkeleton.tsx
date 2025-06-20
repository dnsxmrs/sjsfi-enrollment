import { BellIcon } from "lucide-react";

export default function NotificationSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                    <BellIcon className="h-5 w-5 text-[#000]" />
                    <span className="font-medium text-xl text-[#000]">Notifications</span>
                </div>
                <div className="relative">
                    <div className="w-48 h-8 bg-gray-200 rounded-md animate-pulse" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <tbody>
                        {[...Array(5)].map((_, index) => (
                            <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-amber-50' : ''}`}>
                                <td className="py-3 px-4 w-1/3">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                </td>
                                <td className="py-3 px-4">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}