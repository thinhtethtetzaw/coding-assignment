export interface Item {
  type: "Fruit" | "Vegetable";
  name: string;
  id: string;
}

export interface ListProps {
  items: Item[];
  onItemClick: (item: Item) => void;
  title: string;
  colorClass: string;
  showType?: boolean;
}

export interface DepartmentCardProps {
  department: string;
  data: DepartmentSummary;
}

export interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}
