export interface QuestionType {
  name: string;
  points: number;
}

export interface AssignmentType {
  name: string;
  gradescopeLink: string;
  solutionsLink: string;
  pageName: string;
  questions: QuestionType[];
}