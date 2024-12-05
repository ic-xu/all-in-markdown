export interface TodoItem {
  text: string;
  completed: boolean;
  date?: Date;
  assignee?: string;
}