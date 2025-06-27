import React, { useState, useEffect } from "react";

type EditYearLevelModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (id: number, name: string) => Promise<{ success: boolean; error?: string; message?: string }>;
    yearLevel: { id: number; name: string } | null;
};

export default function EditYearLevelModal({
    isOpen,
    onClose,
    onEdit,
    yearLevel
}: EditYearLevelModalProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (yearLevel) {
            setName(yearLevel.name);
        }
    }, [yearLevel]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Year level name is required");
            return;
        }

        if (!yearLevel) return;

        setError("");
        setIsLoading(true);

        try {
            const result = await onEdit(yearLevel.id, name.trim());
            if (result.success) {
                // Modal will be closed by parent component
            } else {
                setError(result.error || "Failed to update year level");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setName("");
        setError("");
        onClose();
    };

    if (!isOpen || !yearLevel) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
                <h2 className="text-gray-700 text-xl font-bold text-center mb-4">Edit Year Level</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year Level Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError("");
                        }}
                        placeholder="e.g., Kinder 1, Grade 1, Grade 7"
                        className="text-gray-700 w-full border border-red-800 px-3 py-2 rounded-md focus:outline-none"
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}
