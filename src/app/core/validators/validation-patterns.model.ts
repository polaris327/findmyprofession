export const REGEX_EMAIL_PATTERN: RegExp = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
export const REGEX_PASSWORD_PATTERN: RegExp = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/;
export const REGEX_LINKED_IN: RegExp | string = '^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$';
export const REGEX_PHONE_NUMBER_PATTERN: RegExp = /^[0-9]{10}$/;
export const REGEX_ZIP_PATTERN: RegExp = /^\d{5}(?:[-\s]\d{4})?$/;