export default function ScheduleSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-4"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}