import { createTheme } from "@mui/material";
import { ComponentsOverrides } from "@mui/material/styles";
import { AlertClassKey as MuiAlertClassKey } from "@mui/material/Alert/alertClasses";
// import { amber } from "@mui/material/colors";

declare module "@mui/material/styles" {
  // interface Theme {
  //   status: {
  //     danger: string;
  //   };
  // }
  // allow configuration using `createTheme`
  // interface ThemeOptions {}
}

declare module "@mui/material/styles/overrides" {
  // interface AlertClassKey {
  //   standardWarning: {
  //     backgroundColor: string;
  //   };
  // }
  // interface ComponentNameToClassKey {
  //   MuiAlert: {
  //     styleOverrides:
  //       | ComponentsOverrides["MuiAlert"]
  //       | {
  //           standardWarning: {
  //             backgroundColor: string;
  //           };
  //         };
  //   };
  // }
}
export const theme = createTheme();
// {
// components: {
//   MuiDialog: {
//     styleOverrides: {
//       paper: {
//         backgroundColor: "#f50000",
//       },
//     },
//   },
// },
// }
