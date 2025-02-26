import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { fetchAndTransformUsers } from "./api/userTransform";
import { DepartmentCard } from "./components/DepartmentCard";
import { ItemList } from "./components/ItemList";
import type { Item } from "./types";

const initialItems = [
  { type: "Fruit" as const, name: "Apple", id: "1" },
  { type: "Vegetable" as const, name: "Broccoli", id: "2" },
  { type: "Vegetable" as const, name: "Mushroom", id: "3" },
  { type: "Fruit" as const, name: "Banana", id: "4" },
  { type: "Vegetable" as const, name: "Tomato", id: "5" },
  { type: "Fruit" as const, name: "Orange", id: "6" },
  { type: "Fruit" as const, name: "Mango", id: "7" },
  { type: "Fruit" as const, name: "Pineapple", id: "8" },
  { type: "Vegetable" as const, name: "Cucumber", id: "9" },
  { type: "Fruit" as const, name: "Watermelon", id: "10" },
  { type: "Vegetable" as const, name: "Carrot", id: "11" },
].map((item) => ({ ...item, id: crypto.randomUUID() }));

type ListsState = {
  main: Item[];
  fruits: Item[];
  vegetables: Item[];
};

function App() {
  const [lists, setLists] = useState<ListsState>({
    main: initialItems,
    fruits: [],
    vegetables: [],
  });

  const {
    data: departmentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchAndTransformUsers,
  });

  const moveItemToType = useCallback((item: Item) => {
    setLists((prev) => ({
      ...prev,
      main: prev.main.filter((i) => i.id !== item.id),
      [item.type === "Fruit" ? "fruits" : "vegetables"]: [
        ...prev[item.type === "Fruit" ? "fruits" : "vegetables"],
        item,
      ],
    }));

    setTimeout(() => {
      setLists((prev) => ({
        ...prev,
        [item.type === "Fruit" ? "fruits" : "vegetables"]: prev[
          item.type === "Fruit" ? "fruits" : "vegetables"
        ].filter((i) => i.id !== item.id),
        main: [...prev.main, item],
      }));
    }, 5000);
  }, []);

  const moveBackToMain = useCallback((item: Item) => {
    setLists((prev) => ({
      ...prev,
      [item.type === "Fruit" ? "fruits" : "vegetables"]: prev[
        item.type === "Fruit" ? "fruits" : "vegetables"
      ].filter((i) => i.id !== item.id),
      main: [...prev.main, item],
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* Todo Lists Section */}
      <div className="p-8">
        <div className="mb-6 space-y-4 text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Auto Delete Todo List
          </h1>
          <p className="text-lg text-gray-600">
            Click items to sort them automatically
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <ItemList
            items={lists.main}
            onItemClick={moveItemToType}
            title="Main List"
            colorClass="bg-blue-500"
            showType={true}
          />
          <ItemList
            items={lists.fruits}
            onItemClick={moveBackToMain}
            title="Fruits"
            colorClass="bg-emerald-500"
          />
          <ItemList
            items={lists.vegetables}
            onItemClick={moveBackToMain}
            title="Vegetables"
            colorClass="bg-emerald-500"
          />
        </div>
      </div>

      {/* Department Data Section */}

      <div className="rounded-3xl border border-white/50 bg-white px-8 py-6 shadow-xl">
        <div className="mb-6 space-y-4 text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Department Data from API
          </h1>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            Error loading department data
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Object.entries(departmentData || {}).map(([dept, data]) => (
              <DepartmentCard key={dept} department={dept} data={data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
