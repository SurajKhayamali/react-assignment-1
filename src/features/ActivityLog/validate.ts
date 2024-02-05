import type { Activity, User } from './activityLog.interface';

type Errors = Record<string, string>;
type GenericErrors<T> = Record<keyof T, string>;

export const validateUserDetail = (user: User) => {
  const { name, age, contactNumber } = user;
  const errors: Errors = {};

  if (!name) {
    errors.name = 'Please enter a name';
  } else if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  } else if (name.length > 30) {
    errors.name = 'Name cannot have more than 30 characters';
  }

  if (!age) {
    errors.age = 'Please enter a age';
  } else if (Number.isNaN(age)) {
    errors.age = 'Age must be a number';
  }

  if (!contactNumber) {
    errors.contactNumber = 'Please enter a contact number';
  } else if (contactNumber.length < 10 || contactNumber.length > 15) {
    errors.contactNumber = 'Please enter a valid contact number';
  }

  return errors as GenericErrors<User>;
};

export const validateActivity = (activity: Omit<Activity, 'id'>) => {
  const { description, timeSpent } = activity;
  const errors: Errors = {};

  if (!description) {
    errors.description = 'Please enter a short description of the activity';
  } else if (description.length > 3) {
    errors.description = 'Description must be at least 3 characters long';
  }

  if (!timeSpent) {
    errors.timeSpent = 'Please enter time spent for the activity';
  } else if (Number.isNaN(timeSpent)) {
    errors.timeSpent = 'Please enter a numeric value for time spent';
  }

  return errors as GenericErrors<Activity>;
};
