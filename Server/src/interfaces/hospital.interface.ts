export interface HospitalUserInterface {
  email: string;
  password: string;
  refreshToken: string;
}

export default interface CreateHospitalInterface {
  name: string;
  contactNumber: string;
  contactEmail: string;
  address: string;
  location: HospitalLocationInterface;
  service: HospitalServiceInterface;
  hospitalUser: HospitalUserInterface;
}

export interface LoginHospitalInterface {
  email: string;
  password: string;
}

export interface HospitalServiceInterface {
  services: string[];
  facilities: string[];
  emergencyBeds: number;
  totalBeds: number;
  availableBeds: number;
}

export interface HospitalLocationInterface {
  latitude: number;
  longitude: number;
}

export interface HospitalJwtSignPayloadInterface {
  name: string;
  email: string;
  iss: string;
  iat: number;
  exp: number;
}

export interface HospitalJwtSignAccessTokenPayloadInterface {
  name: string;
  hospitalId: string;
  email: string;
  iss: string;
  iat: number;
  exp: number;
}

export interface HospitalCreatedResponseInterface {
  message: string;
  data: {
    name: string;
    contactNumber: string;
    contactEmail: string;
    address: string;
    loginEmail: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface HospitalLoginResponseInterface {
  accessToken: string;
  refreshToken: string;
}

export interface CheckNearbyHospitalsInterface {
    lat: number;
    lng: number;
    radius?: number;
}