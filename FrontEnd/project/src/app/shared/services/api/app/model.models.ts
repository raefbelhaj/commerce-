/* eslint-disable @typescript-eslint/ban-types */
export interface Model extends Object {
  id?: number | null;
  test?: string | null;
  image?: string | null;
}

export interface ModelCreationInput extends Object {
  id?: number | null;
  test?: string | null;
  image?: string | null;
}

export interface ModelUpdateInput extends Object {
  id?: number | null;
  test?: string | null;
  image?: string | null;
}