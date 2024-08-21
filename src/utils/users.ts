import * as MOCK_USERS from './users.json';
import * as MOCK_COMPANIES from './companies.json';

export const getUser = (id: string) => {
  // In real application, this function should fetch from user/company service

  const user = MOCK_USERS.find((user) => user._id === id);
  return user;
};

export const getCompany = (id: string) => {
  // In real application, this function should fetch from user/company service

  const company = MOCK_COMPANIES.find((company) => company._id === id);
  return company;
};
