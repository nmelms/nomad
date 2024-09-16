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

export interface Step1Props {
  form: UseFormReturn<FormData>; // Type should be inferred from the schema
  handleSubmit: (data: FormData) => Promise<void>;
  handleFindOnMap: () => void;
  handleUseLocation: () => void;
  gettingLocation: boolean;
  formSchema: any;
}
