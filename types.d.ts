export interface AddLocationProps {
  handleFindOnMap: () => void;
  locationLatLng: number[] | [];
}
export interface LocationData {
  locationName: string;
  latitude: number;
  longitude: number;
  description: string;
}
