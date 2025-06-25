'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getStudentsByGradeLevel } from '@/app/_actions/getStudentsByGradeLevel';

interface ChartData {
  name: string;
  value: number;
}

const COLORS = [
  '#FF9F1C', '#FF4040', '#2EC4B6', '#3D348B', '#FFBF00',
  '#8D99AE', '#00BFFF', '#A23E48', '#4CAF50', '#7B2CBF'
];

const GradePieChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getStudentsByGradeLevel();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center gap-4">
        <div className="w-[280px] h-[280px] flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-gray-500">Loading chart...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center gap-4">
        <div className="w-[280px] h-[280px] flex items-center justify-center bg-red-50 rounded-lg">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center gap-4">
        <div className="w-[280px] h-[280px] flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-gray-500">No student data available</div>
        </div>
      </div>
    );
  }

  const totalStudents = data.reduce((sum, entry) => sum + entry.value, 0);

  const renderCustomLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center gap-4">
      <div className="flex flex-col items-center">
        <ResponsiveContainer width={280} height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold text-gray-700">
            Total Students: {totalStudents}
          </p>
        </div>
      </div>

      {/* Legend block with count */}
      <div className="flex flex-wrap justify-center md:flex-col md:justify-start text-sm text-gray-600">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center mr-4 mb-2 md:mb-1">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="font-medium">{entry.name}</span>
            <span className="ml-2 text-gray-500">({entry.value} students)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradePieChart;
