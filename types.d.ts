import { ZodObject } from "zod";

export interface AddLocationProps {
  handleFindOnMap: () => void;
  locationLatLng: number[] | [];
  form: UseFormReturn<{
    locationName: string;
    longitude: number;
    latitude: number;
    description: string;
  }>;
  formSchema: ZodObject<any>;
  handleUseLocation;
  gettingLocation: boolean;
}
export interface LocationData {
  locationName: string;
  latitude: number;
  longitude: number;
  description: string;
}
