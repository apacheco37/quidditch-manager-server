import { Request } from "express";
import { UserInterface } from "./user.interface";

export interface RequestWithUserInterface extends Request {
  user: UserInterface;
}
