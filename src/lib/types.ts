export interface DisplayBoardLocations {
  data: Datum[];
}

export interface Datum {
  id: number;
  status: string;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
  Location_Name: string;
  Display_Boards: string[];
}
