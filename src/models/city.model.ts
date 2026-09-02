export type City = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  zone: string;
  latitude: number;
  longitude: number;
  isCurrent?: boolean;
};

export type SolarWindow = {
  sunrise: Date;
  sunset: Date;
  isDay: boolean;
};
