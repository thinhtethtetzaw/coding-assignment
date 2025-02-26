import { DepartmentCardProps } from "../types";

export function DepartmentCard({ department, data }: DepartmentCardProps) {
  return (
    <div className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        {department}
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Gender">
            <p>
              <span>Male:</span> {data.male}
            </p>
            <p>
              <span>Female:</span> {data.female}
            </p>
          </StatCard>

          <StatCard title="Age Range">
            <p className="text-gray-700">{data.ageRange}</p>
          </StatCard>

          <StatCard title="Hair Colors">
            <div className="grid grid-cols-2 gap-3 text-gray-600">
              {Object.entries(data.hair).map(([color, count]) => (
                <div
                  key={color}
                  className="text-sm bg-gray-100 px-2 py-1 rounded-md"
                >
                  {color}: <span>{count}</span>
                </div>
              ))}
            </div>
          </StatCard>
        </div>

        <StatCard title="User Addresses">
          <div className="space-y-2">
            {Object.entries(data.addressUser).map(([name, postal]) => (
              <div key={name} className="text-sm bg-gray-100 p-2 rounded-md">
                <span className="font-medium text-gray-700">{name}</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-500">{postal}</span>
              </div>
            ))}
          </div>
        </StatCard>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  children: React.ReactNode;
}

function StatCard({ title, children }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
      <h2 className="text-lg font-bold mb-2 text-gray-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        {title}
      </h2>
      {children}
    </div>
  );
}
