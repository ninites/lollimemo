import { GamePlayed } from './profile/played/played.interface';

export interface UserInfo {
  _id: string;
  games?: GamePlayed[];
  themes: Theme[];
  username: string;
  password?: string;
  email?: string;
}

export interface Theme {
  name: string;
  images: Image[];
  _id: string;
}

export interface Image {
  type: string;
  path: string;
  _id: string;
}
