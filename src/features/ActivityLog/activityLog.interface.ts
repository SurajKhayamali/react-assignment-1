export interface User {
  name: string;
  age: number;
  contactNumber: string;
}

export interface Activity {
  id: string;
  description: string;
  timeSpent: number;
}

export interface ActivityDetail {
  user: User;
  activities: Activity[];
}

export type ActivityIdType = Activity['id'];
