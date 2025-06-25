import { AlertCircle } from "lucide-react";

export default function ErrorDisplay({ message, reset }: { message: string; reset: () => void }) {
    return (
        <div className="bg-white shadow-sm rounded-lg p-6 m-4 border border-red-100 text-black">
            <div className="flex items-center gap-3 mb-4 text-black">
                <AlertCircle className="h-6 w-6 text-red-800" />
                <h2 className="text-xl font-semibold text-red-800">Something went wrong</h2>
            </div>
            <div className="bg-red-50 rounded-md p-4 mb-4">
                <pre className="text-sm text-red-600 font-mono whitespace-pre-wrap">
                    {message}
                </pre>
            </div>
            <button
                onClick={reset}
                className="w-full md:w-auto px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors flex items-center justify-center gap-2"
            >
                <span>Try again</span>
            </button>
        </div>
    )
}