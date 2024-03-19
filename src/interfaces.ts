export interface PexelsApiResponse {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
  prev_page?: string;
  photos: PexelsPhoto[];
}

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSources;
  liked: boolean;
  alt: string;
}

export interface PexelsPhotoSources {
  original: string;
  large: string;
  large2x: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export enum Step {
  Search,
  Choise,
  Result
}

export interface ImgCard {
  name: string;
  surname: string;
}

export interface setImageProps extends ImgCard {
  photos: PexelsPhoto[];
}

export interface FormProps {
  setImages: (data: setImageProps) => void;
}

export interface ChoiseProps {
  images: PexelsPhoto[];
  openForm: () => void;
  onAccept: (index: number) => void;
}

export interface ResultProps {
  name: string;
  surname: string;
  image: PexelsPhoto;
}
