export interface Schedule {
  id?: number;
  pet_id: number;
  subservice_id: number;
  subservice?: string;
  name?: string;
  icon?: string;
  date: string;
}
