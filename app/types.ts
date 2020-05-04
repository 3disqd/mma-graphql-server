import { ObjectId } from 'mongodb';

export type Ref<T> = T | ObjectId;

export interface Context {
  user?: Token;
}
export interface Auth {
  jwt: string;
  rt?: string;
}

export interface Token {
  id: string;
  email: string;
  roles: string[];
  iat?: number
}
