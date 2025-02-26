import { ListProps } from "../types";

export function ItemList({
  items,
  onItemClick,
  title,
  colorClass,
  showType = false,
}: ListProps) {
  return (
    <div className="bg-white px-8 py-6 rounded-3xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className={`group relative ${colorClass} text-white p-4 py-2 rounded-md hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-lg w-full`}
          >
            <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="font-medium">{item.name}</span>
            {showType && (
              <span className="text-blue-100 text-sm ml-2 opacity-75">
                ({item.type})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
