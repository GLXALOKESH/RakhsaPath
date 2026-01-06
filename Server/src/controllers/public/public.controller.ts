import ErrorInterface from "../../interfaces/error.interface.js";
import BookEmergencySeatInterface from "../../interfaces/public.interface.js";
import { Request, Response } from "express";


export default class PublicController {
 
    async bookEmergencySeat(req: Request, res: Response) {
        try {
            const bookEmergencySeatData = req.body as BookEmergencySeatInterface;
            
        } catch (error: any & ErrorInterface) {
            throw Error(error.message);
        }
    }
}