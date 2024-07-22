import {
  createDirectus,
  staticToken,
  rest,
  verifyHash,
  readItems,
  createItem,
  updateItem,
  generateHash,
  readUsers,
} from "@directus/sdk";

import { DisplayBoardLocations } from "./types";

interface MySchema {
  Display_Board_Locations: DisplayBoardLocations[];
}

//should be in env
const apiClient = "YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"
  ? createDirectus("https://data.zanda.info")
      .with(staticToken("YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"))
      .with(rest())
  : undefined;

const displayBoards: any = "Display_Boards";
const displayBoardLocations: any = "Display_Board_Locations";

// export async function getDisplayBoards(): Promise<
//   DisplayBoardLocations | undefined
// > {
//   return await apiClient?.request(
//     readItems(displayBoards, {
//       fields: ["*"],
//     })
//   );
// }

export async function getDisplayBoardLocations() {
  return await apiClient?.request(
    readItems(displayBoardLocations, {
      fields: [
        "status",
        "Location_Name",
        "date_created",
        "user_created.first_name",
        "user_created.last_name",
        "user_created.avatar",
        "Display_Boards.status",
        "Display_Boards.Board_Name",
        "Display_Boards.Board_Items",
        "Display_Boards.Board_Items.Board_Items",
        "Display_Boards.Board_Items.Board_Items.Code",
        "Display_Boards.Board_Items.Board_Items.Description",
      ],
    })
  );
}

export type GeneratedType = Awaited<
  ReturnType<typeof getDisplayBoardLocations>
>;

export async function getUsers() {
  return await apiClient?.request(
    readUsers({
      fields: ["*"],
    })
  );
}
