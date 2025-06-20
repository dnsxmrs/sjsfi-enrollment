export default function PolicySkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 border-b">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-4">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                    {/* First paragraph */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    {/* Second paragraph */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                    </div>
                    {/* Third paragraph */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                    </div>
                    {/* Fourth paragraph */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    )
} 