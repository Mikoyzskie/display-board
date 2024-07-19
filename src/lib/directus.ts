import {
  createDirectus,
  staticToken,
  rest,
  verifyHash,
  readItems,
  createItem,
  updateItem,
  generateHash,
} from "@directus/sdk";
//should be in env
const apiClient = "YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"
  ? createDirectus("https://data.zanda.info")
      .with(staticToken("YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"))
      .with(rest())
  : undefined;

const employees: any = "Employees";

export async function getEmployees(username: string) {
  return await apiClient?.request(
    readItems(employees, {
      fields: ["*"],
      filter: {
        Employee_Username: {
          _eq: username,
        },
      },
    })
  );
}

export async function getAllEmployees() {
  return await apiClient?.request(
    readItems(employees, {
      fields: [
        "id",
        "Employee_Username",
        "employee_pin",
        "employee_name",
        "employee_icon",
        "Clock_Status",
      ],
    })
  );
}

const iplist: any = "time_clock_allowed_ips";

//Attendence directus table
const attendance: any = "Attendance_Clocks";

export async function getAllIps() {
  return await apiClient?.request(
    readItems(iplist, {
      fields: ["IP_Address"],
    })
  );
}

export async function verifyPin(pin: string, hash: string) {
  return apiClient?.request(verifyHash(pin, hash));
}

export async function generatehash(pin: string) {
  return apiClient?.request(generateHash(pin));
}

const clocks: any = "Employee_Clocks";

export async function getEmployeeClocks(user: number) {
  return await apiClient?.request(
    readItems(clocks, {
      fields: ["*"],
      sort: ["-clock_in"],
      filter: {
        Clock_User: {
          _eq: user,
        },
      },
      limit: 2,
    })
  );
}

export async function getAllClocks() {
  return await apiClient?.request(
    readItems(clocks, {
      fields: ["id", "Clock_User", "clock_in", "Clock_Out_Timestamp"],
      sort: ["-Clock_In_Timestamp"],
      limit: 2,
    })
  );
}

export async function TimeIn(user: number) {
  return await apiClient?.request(
    createItem(clocks, {
      Clock_User: user,
    })
  );
}
export async function ExtendTimeIn(user: number) {
  return await apiClient?.request(
    updateItem(employees, user, {
      Clock_Status: true,
    })
  );
}

export async function Timeout(id: number) {
  let now = new Date();

  return await apiClient?.request(
    updateItem(clocks, id, {
      Clock_Out_Timestamp: now,
    })
  );
}

export async function ExtendTimeOut(user: number) {
  return await apiClient?.request(
    updateItem(employees, user, {
      Clock_Status: false,
    })
  );
}

export async function UpdatePin(id: number, pin: string) {
  return await apiClient?.request(
    updateItem(employees, id, {
      employee_pin: pin,
    })
  );
}

export async function GetAttendance(user: number) {
  return await apiClient?.request(
    readItems(attendance, {
      fields: ["*"],
      filter: {
        clock_user: {
          _eq: user,
        },
      },
      sort: ["-date_created"],
      limit: 1,
    })
  );
}

export async function AttendanceIn(
  user: number,
  timein: string,
  timezone: string,
  offset: string
) {
  return await apiClient?.request(
    createItem(attendance, {
      clock_user: user,
      clock_in_utc: timein,
      local_device_timezone: timezone,
      timezone_offset: offset,
    })
  );
}
export async function AttendanceOut(id: number, timeout: string) {
  return await apiClient?.request(
    updateItem(attendance, id, {
      clock_out_utc: timeout,
    })
  );
}
