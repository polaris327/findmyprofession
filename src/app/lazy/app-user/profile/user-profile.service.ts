import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {IProfile} from './user-profile.model';
import {IProfileModel} from './accordion-tabs/profile/accordion-tab-profile.model';
import {IReferenceItem} from './accordion-tabs/references/reference-item/reference-item.model';
import {ICareerPreferencesForm} from './accordion-tabs/career-preferences/career-preferences.model';
import {IWorkExperienceEntity} from './accordion-tabs/exprience/work-experience-item/work-experience-item.model';
import {IEducationEntity} from './accordion-tabs/exprience/education-experience-item/education-experience-item.model';
import {IProfileQuestionsModel} from './accordion-tabs/questions/accordion-tab-questions.model';
import {IDocumentModel} from './accordion-tabs/documents/accordion-tab-documents.model';
import {HttpService} from '../../../core/services/http.service';
import {IErrorResponse, IHttpRequest} from '../../../core/models/core.model';
import {
  CAREER_PREFERENCES, EDUCATION_EXPERIENCE, PROFILE_DATA, PROFILE_DOCUMENT, PROFILE_QUESTIONS_URL, PROFILE_REFERENCE,
  WORK_EXPERIENCE
} from '../../../core/models/api-urls.model';
import {DOMAIN_URL} from '../../../../main.config';

@Injectable()
export class UserProfileService {

  constructor(private httpService: HttpService) {}

  public updateProfileForm(model: IProfileModel): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      url: PROFILE_DATA,
      body: model,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to update CareerPreferences Form
   * @param model
   * @returns {Observable<any>}
   */
  public updateCareerPreferences(model: ICareerPreferencesForm): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      url: CAREER_PREFERENCES,
      body: model,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method that creates new Reference
   * @param reference
   * @returns {Observable<any>}
   */
  public createReference(reference: IReferenceItem): Observable<IProfile> {
    const request: IHttpRequest = {
      method: 'POST',
      url: PROFILE_REFERENCE,
      body: reference,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method that updates new Reference
   * @param reference
   * @returns {Observable<IProfile>}
   */
  public updateReference(reference: IReferenceItem): Observable<IProfile> {
    const request: IHttpRequest = {
      method: 'PUT',
      url: PROFILE_REFERENCE,
      body: reference,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method that updates new Reference
   * @param referenceId
   * @returns {Observable<IProfile>}
   */
  public removeReference(referenceId: number): Observable<IProfile> {
    const request: IHttpRequest = {
      method: 'DELETE',
      url: `${PROFILE_REFERENCE}/${referenceId}`,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method that creates Work Experience or Education entity
   * @param experience
   * @param isEducation
   * @returns {Observable<any>}
   */
  public createExperienceItem(experience: IWorkExperienceEntity | IEducationEntity, isEducation: boolean = false): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      url: isEducation ? EDUCATION_EXPERIENCE : WORK_EXPERIENCE,
      body: experience,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method that updates existing Work Experience or Education entity
   * @param experience
   * @param isEducation
   * @returns {Observable<any>}
   */
  public updateExperience(experience: IWorkExperienceEntity | IEducationEntity, isEducation: boolean = false): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'PUT',
      url: isEducation ? EDUCATION_EXPERIENCE : WORK_EXPERIENCE,
      body: experience,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to remove experience entity : Work , Education
   * @param experienceId
   * @param isEducation
   * @returns {Observable<any>}
   */
  public removeExperienceItem(experienceId: number , isEducation: boolean = false): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'DELETE',
      url: `${isEducation ? EDUCATION_EXPERIENCE : WORK_EXPERIENCE}/${experienceId}`,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  public updateQuestions(answers: IProfileQuestionsModel): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      url: PROFILE_QUESTIONS_URL,
      body: answers,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }


  /**
   * Method to upload specific document to server
   * @param document
   * @returns {Observable<IProfile | IErrorResponse>}
   */
  public uploadDocument(document: File): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      body: {document},
      url: PROFILE_DOCUMENT,
      userToken: true,
      encoding: 'fd' /*multipart-data*/
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to update specific document
   * @param document
   * @returns {Observable<IProfile | IErrorResponse>}
   */
  public updateDocument(document: IDocumentModel): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'PUT',
      body: {
        id: document.id,
        type: document.type
      },
      url: PROFILE_DOCUMENT,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to remove specific document by id
   * @param docId
   * @returns {Observable<IProfile | IErrorResponse>}
   */
  public removeDocument(docId: number): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'DELETE',
      url: `${PROFILE_DOCUMENT}/${docId}`,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to select specific document template by id
   * @param templateId
   * @returns {Observable<Observable<IProfile | IErrorResponse>>}
   */
  public selectDocumentTemplate(templateId: number): Observable<IProfile | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      url: '',
      body: {templateId},
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to
   * @param fileSrc
   * @returns {Observable<string | IErrorResponse>}
   */
  public downloadFile(fileSrc: string): Observable<string | IErrorResponse> {
    const request: IHttpRequest = {
      url: `${DOMAIN_URL}${fileSrc}`,
      userToken: true,
      absolutePath: true,
      isBlob: true
    };
    return this.httpService.sendRequest(request);
  }
}