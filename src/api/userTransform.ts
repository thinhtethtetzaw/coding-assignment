interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  hair: {
    color: string;
  };
  address: {
    postalCode: string;
  };
  company: {
    department: string;
  };
}

export interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}

interface DepartmentGroup extends Omit<DepartmentSummary, "ageRange"> {
  ages: number[];
}

export async function fetchAndTransformUsers(): Promise<
  Record<string, DepartmentSummary>
> {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    const users: User[] = data.users;

    const departmentGroups = users.reduce(
      (acc, user) => {
        const dept = user.company.department;
        if (!acc[dept]) {
          acc[dept] = {
            male: 0,
            female: 0,
            ages: [],
            hair: {},
            addressUser: {},
          };
        }

        if (user.gender === "male") acc[dept].male++;
        else acc[dept].female++;

        acc[dept].ages.push(user.age);

        const hairColor = user.hair.color;
        acc[dept].hair[hairColor] = (acc[dept].hair[hairColor] || 0) + 1;

        const fullName = `${user.firstName}${user.lastName}`;
        acc[dept].addressUser[fullName] = user.address.postalCode;

        return acc;
      },
      {} as Record<string, DepartmentGroup>
    );

    return Object.entries(departmentGroups).reduce(
      (acc, [dept, data]) => {
        const ages = data.ages;
        const minAge = Math.min(...ages);
        const maxAge = Math.max(...ages);

        acc[dept] = {
          male: data.male,
          female: data.female,
          ageRange: `${minAge}-${maxAge}`,
          hair: data.hair,
          addressUser: data.addressUser,
        };

        return acc;
      },
      {} as Record<string, DepartmentSummary>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
