import { WorkHour } from "./work-hour.interface";

export interface ProviderProfileDetails {
  companyName: string;
  address: string;
  phoneNumber: string;
  description: string;
  availableDays: number[];
  category: number[];
  workHours: ProviderProfileDetailsWorkHour[];
}

export interface ProviderProfileDetailsWorkHour {
  toWorkHourId: number;
  fromWorkHourId: number;
}
