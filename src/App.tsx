import { useState, useEffect, useCallback } from "react";
import { fetchAndTransformUsers } from "./api/userTransform";
import type { Item, DepartmentSummary } from "./types";
import { ItemList } from "./components/ItemList";
import { DepartmentCard } from "./components/DepartmentCard";

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

function App() {
  const [mainList, setMainList] = useState<Item[]>(initialItems);
  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);
  const [departmentData, setDepartmentData] = useState<
    Record<string, DepartmentSummary>
  >({});

  useEffect(() => {
    const loadDepartmentData = async () => {
      try {
        const data = await fetchAndTransformUsers();
        setDepartmentData(data);
      } catch (error) {
        console.error("Failed to load department data:", error);
      }
    };
    loadDepartmentData();
  }, []);

  const moveItemToType = useCallback((item: Item) => {
    setMainList((prev) => prev.filter((i) => i.id !== item.id));
    const setList = item.type === "Fruit" ? setFruitList : setVegetableList;
    setList((prev) => [...prev, item]);

    setTimeout(() => {
      setList((prev) => prev.filter((i) => i.id !== item.id));
      setMainList((prev) => [...prev, item]);
    }, 5000);
  }, []);

  const moveBackToMain = useCallback((item: Item) => {
    const setList = item.type === "Fruit" ? setFruitList : setVegetableList;
    setList((prev) => prev.filter((i) => i.id !== item.id));
    setMainList((prev) => [...prev, item]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* Todo Lists Section */}
      <div className="p-8">
        <div className="text-center space-y-4 mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Auto Delete Todo List
          </h1>
          <p className="text-gray-600 text-lg">
            Click items to sort them automatically
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <ItemList
            items={mainList}
            onItemClick={moveItemToType}
            title="Main List"
            colorClass="bg-blue-500"
            showType={true}
          />
          <ItemList
            items={fruitList}
            onItemClick={moveBackToMain}
            title="Fruits"
            colorClass="bg-emerald-500"
          />
          <ItemList
            items={vegetableList}
            onItemClick={moveBackToMain}
            title="Vegetables"
            colorClass="bg-emerald-500"
          />
        </div>
      </div>

      {/* Department Data Section */}
      <div className="bg-white px-8 py-6 rounded-3xl shadow-xl border border-white/50">
        <div className="text-center space-y-4 mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Department Data from API
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(departmentData).map(([dept, data]) => (
            <DepartmentCard key={dept} department={dept} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
