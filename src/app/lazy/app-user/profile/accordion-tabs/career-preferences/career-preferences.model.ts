export interface ICareerPreferencesModel {

  types: Array<string>;

  categories: Array<string>;

  experience: Array<string>;

  education: Array<string>;

  salary: Array<string>;

}

export interface ICareerPreferencesForm {
  industry: string;
  job_titles: Array<string>;
  job_types: Array<string>;

  relocation_value: boolean;
  relocation_type: string;
  relocation_location: Array<string>;

  experience: string;
  education: string;

  desire_salary_value: number;
  desire_salary_type: string;
}