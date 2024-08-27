import type { User } from "@prisma/client";

export type IUser = Omit<User, "id">;

// // type IUser = {
// //   id: number;
// //   email: string;
// //   password: string;
// //   faultyFacilitiesReports: IFaultyFacilities[];
// //   behaviorsReports: IBehaviors[];
// //   emergencyReports: IEmergencies[];
// // };

// type IFaultyFacilities = {
//   id: number;
//   date: Date;
//   type: string;
//   media?: string;
//   location: string;
//   user: IUser;
//   userId?: number;
// };

// type IEmergencies = {
//   id: number;
//   date: Date;
//   type: string;
//   media?: string;
//   location: string;
//   user: IUser;
//   userId?: number;
// };

// type IBehaviors = {
//   id: number;
//   location: string;
//   date: Date;
//   evidence?: string;
//   violation: number;
//   userId: number;
//   user: IUser;
// };
