export interface CropProps {
  type: string;
  pictures: any;
  opacity?: number;
  closeOnClick?: boolean;
  result: () => CropResult;
}

export interface CropResult {
  type: string;
  payload: { [key: string]: any };
}
