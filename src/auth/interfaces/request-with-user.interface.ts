import { Request } from "express";
import { UserResponseInterface } from "./user-response.interface";

export interface RequestWithUserInterface extends Request {
  user: UserResponseInterface;
}
