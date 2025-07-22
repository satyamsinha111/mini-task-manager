
export interface Task {
  id?: string;
  title: string;
  completed?: boolean;
  category?: string;
}

export type TaskFilter = 'all' | 'completed' | 'incomplete';

