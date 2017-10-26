export interface IProfileQuestionsModel {
  work_authorization: string;
  gender: string;
  veteran_status: string;
  disability_status: string;
  race_ethnicity: string;
}

export interface IProfileQuestions {
  work_authorization: Array<string>;
  gender: Array<string>;
  veteran_status: Array<string>;
  disability_status: Array<string>;
  race_ethnicity: Array<string>;
}