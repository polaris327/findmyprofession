
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
export class AccordionTabProfileErrors {

  public formErrors = {
    linkedin_url: '',
    full_name: '',
    postal_code: ''
  };

  public validationMessages = {
    full_name: {
      required: 'Fullname is required field'
    },
    linkedin_url: {
      pattern: `It's not a valid LinkedIn url`
    },
    postal_code: {
      pattern: 'Postal code has invalid format'
    }
  };

}

export interface IProfileTabsMaskSettings {
  postal_code: IFieldMaskSetting;
  state: IFieldMaskSetting;
  city: IFieldMaskSetting;
  address: IFieldMaskSetting;
}

export interface IFieldMaskSetting {
  types: Array<string>;
  componentRestrictions: {
    country: string
  }
}

export interface IProfileModel {
  birth_date?: string | NgbDateStruct;
  city?: string;
  full_name?: string;
  linkedin_url?: string;
  phone_number?: string;
  state?: string;
  street_address?: string;
  postal_code?: string;
  email?: string;
}

export const COMPONENT_RESTRICTIONS: any = {
  country: 'US'
};

export const FIELD_SETTINGS: IProfileTabsMaskSettings = {
  postal_code: {
    types: [
      '(regions)'
    ],
    componentRestrictions: COMPONENT_RESTRICTIONS
  },
  state: {
    types: [
      'geocode'
    ],
    componentRestrictions: COMPONENT_RESTRICTIONS
  },
  city: {
    types: [
      '(cities)'
    ],
    componentRestrictions: COMPONENT_RESTRICTIONS
  },
  address: {
    types: [
      'address'
    ],
    componentRestrictions: COMPONENT_RESTRICTIONS
  }
};
