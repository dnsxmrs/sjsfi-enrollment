'use client';

import { Plus, Edit, Trash2 } from "lucide-react";
import AddAcademicTermModal from '@/components/admin/AddAcademicTermModal';
import AddYearLevelModal from '@/components/admin/AddYearLevelModal';
import EditYearLevelModal from '@/components/admin/EditYearLevelModal';
import dynamic from 'next/dynamic';

const EditPolicyModal = dynamic(() => import('@/components/admin/EditPolicyModal'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
import { useState, useEffect } from "react";
import { getSchoolAllYears } from '@/app/_actions/getSchoolYears';
import { getYearLevels } from '@/app/_actions/getYearLevels';
import { addYearLevel, updateYearLevel, deleteYearLevel } from '@/app/_actions/yearLevelActions';
import { getGeneralPolicy, saveGeneralPolicy } from '@/app/_actions/generalPolicyActions';
import toast from "react-hot-toast";

interface SchoolYear {
  id: number;
  year: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface YearLevel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export default function AcademicSettingsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddYearLevelModal, setShowAddYearLevelModal] = useState(false);
  const [showEditYearLevelModal, setShowEditYearLevelModal] = useState(false);
  const [selectedYearLevel, setSelectedYearLevel] = useState<YearLevel | null>(null);
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
  const [yearLevels, setYearLevels] = useState<YearLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearLevelsLoading, setYearLevelsLoading] = useState(true);
  const [policyLoading, setPolicyLoading] = useState(true);
  const [policyText, setPolicyText] = useState('');

  // Fetch school years on component mount
  useEffect(() => {
    async function fetchSchoolYears() {
      try {
        setLoading(true);
        const result = await getSchoolAllYears();
        if (result.success) {
          setSchoolYears(result.schoolYears || []);
        }
      } catch (error) {
        console.error('Error fetching school years:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchoolYears();
  }, []);

  // Fetch year levels on component mount
  useEffect(() => {
    fetchYearLevels();
  }, []);

  // Fetch general policy on component mount
  useEffect(() => {
    fetchGeneralPolicy();
  }, []);

  const fetchGeneralPolicy = async () => {
    try {
      setPolicyLoading(true);
      const result = await getGeneralPolicy();
      if (result.success && result.policy) {
        setPolicyText(result.policy.content || '');
      } else {
        setPolicyText('<p>No general policy has been set yet. Click "Edit" to add one.</p>');
      }
    } catch (error) {
      console.error('Error fetching general policy:', error);
      setPolicyText('<p>Error loading policy. Please try again.</p>');
    } finally {
      setPolicyLoading(false);
    }
  };

  const handleSavePolicy = async (updatedText: string) => {
    try {
      const result = await saveGeneralPolicy(updatedText);
      if (result.success) {
        setPolicyText(updatedText);
        toast.success('Policy saved successfully!');
      } else {
        toast.error(result.error || 'Failed to save policy');
      }
    } catch {
      toast.error('Error saving policy. Please try again.');
    }
  };

  const fetchYearLevels = async () => {
    try {
      setYearLevelsLoading(true);
      const result = await getYearLevels();
      if (result.success) {
        setYearLevels(result.yearLevels || []);
      }
    } catch (error) {
      console.error('Error fetching year levels:', error);
    } finally {
      setYearLevelsLoading(false);
    }
  };

  const handleAddYearLevel = async (name: string) => {
    const result = await addYearLevel(name);
    if (result.success) {
      await fetchYearLevels(); // Refresh the list
      setShowAddYearLevelModal(false);
    }
    return result;
  };

  const handleEditYearLevel = async (id: number, name: string) => {
    const result = await updateYearLevel(id, name);
    if (result.success) {
      await fetchYearLevels(); // Refresh the list
      setShowEditYearLevelModal(false);
      setSelectedYearLevel(null);
    }
    return result;
  };

  const handleDeleteYearLevel = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this year level?')) {
      const result = await deleteYearLevel(id);
      if (result.success) {
        await fetchYearLevels(); // Refresh the list
      } else {
        toast.error(result.error || 'Failed to delete year level');
      }
    }
  };

  const openEditYearLevelModal = (yearLevel: YearLevel) => {
    setSelectedYearLevel(yearLevel);
    setShowEditYearLevelModal(true);
  };


  return (
    <div className="p-6 md:p-10 h-screen overflow-hidden">
      <AddAcademicTermModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />

      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="md:w-2/3 flex flex-col gap-6 h-full">
          {/* Academic Term Section */}
          <div className="bg-white border border-red-800 rounded-md p-4 flex flex-col h-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Academic Term</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 bg-white border-b">
                  <tr className="text-gray-700">
                    <th className="px-3 py-2">Academic Term</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="text-gray-700">
                      <td colSpan={3} className="px-3 py-8 text-center border-t">
                        Loading academic terms...
                      </td>
                    </tr>
                  ) : schoolYears.length === 0 ? (
                    <tr className="text-gray-700">
                      <td colSpan={3} className="px-3 py-8 text-center border-t text-gray-500">
                        No academic terms found
                      </td>
                    </tr>
                  ) : (
                    schoolYears.map((schoolYear) => (
                      <tr key={schoolYear.id} className="text-gray-700 hover:bg-gray-50">
                        <td className="px-3 py-2 border-t">{schoolYear.year}</td>
                        <td className="px-3 py-2 border-t">
                          <span className={`px-2 py-1 text-xs rounded-full ${schoolYear.status === 'active'
                            ? 'bg-yellow-300 text-black'
                            : 'bg-green-500 text-white'
                            }`}>
                            {schoolYear.status === 'active' ? 'Ongoing' : 'Done'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-sm border-t">
                          {schoolYear.status === 'active' ? (
                            <>
                              <button className="mr-2 text-green-600 hover:underline">Finish</button>
                              <button className="hover:underline text-red-600">Delete</button>
                            </>
                          ) : (
                            <span className="text-center text-gray-500">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* General Policy Section */}
          <div className="bg-white border border-red-800 rounded-md p-4 flex flex-col h-1/2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">General Policy and Guidelines</h2>
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                <Edit size={16} /> Edit
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {policyLoading ? (
                <div className="text-sm text-gray-500 text-center pt-6">Loading policy...</div>
              ) : (
                <div
                  className="text-gray-700 text-sm leading-relaxed border border-red-300 rounded-md p-3 rich-content"
                  dangerouslySetInnerHTML={{ __html: policyText }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col gap-6 h-full">
          {/* Right Column: Year Level Management */}
          <div className="w-full h-1/2">
            <div className="bg-white border border-red-800 rounded-md p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Year Level</h2>
                <button
                  onClick={() => setShowAddYearLevelModal(true)}
                  className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                {yearLevelsLoading ? (
                  <div className="text-sm text-gray-500 text-center pt-6">Loading year levels...</div>
                ) : yearLevels.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center pt-6">No year levels found</div>
                ) : (
                  <div className="space-y-2">
                    {yearLevels.map((yearLevel) => (
                      <div key={yearLevel.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <span className="text-sm text-gray-700 font-medium">{yearLevel.name}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEditYearLevelModal(yearLevel)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteYearLevel(yearLevel.id)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Right Column: Requirements Management */}
          {/* <div className="w-full h-1/2">
            <div className="bg-white border border-red-800 rounded-md p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Requirements</h2>
                <button
                  // onClick={() => setShowAddYearLevelModal(true)}
                  className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                {yearLevelsLoading ? (
                  <div className="text-sm text-gray-500 text-center pt-6">Loading year levels...</div>
                ) : yearLevels.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center pt-6">No year levels found</div>
                ) : (
                  <div className="space-y-2">
                    {yearLevels.map((yearLevel) => (
                      <div key={yearLevel.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <span className="text-sm text-gray-700 font-medium">{yearLevel.name}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEditYearLevelModal(yearLevel)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteYearLevel(yearLevel.id)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <EditPolicyModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        policyText={policyText}
        onSave={handleSavePolicy}
      />

      <AddYearLevelModal
        isOpen={showAddYearLevelModal}
        onClose={() => setShowAddYearLevelModal(false)}
        onAdd={handleAddYearLevel}
      />

      <EditYearLevelModal
        isOpen={showEditYearLevelModal}
        onClose={() => {
          setShowEditYearLevelModal(false);
          setSelectedYearLevel(null);
        }}
        yearLevel={selectedYearLevel}
        onEdit={handleEditYearLevel}
      />

    </div>
  );
}
