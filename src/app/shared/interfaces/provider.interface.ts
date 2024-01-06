export interface Provider {
  firstName?: string;
  lastName?: string;
  providerId?: number;
  email?: string;
  companyName?: string;
  phoneNumber?: string;
  description?: string;
  address?: string;
  availableDays?: number[];
  category?: number[];
  workHours?: ProviderProfileDetailsWorkHour[];
  clientProviderId?: number;
  providerUserId?: number;
}

export interface ProviderProfileDetailsWorkHour {
  toWorkHourId?: number;
  fromWorkHourId?: number;
}
