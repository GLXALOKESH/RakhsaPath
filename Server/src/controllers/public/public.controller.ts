import ErrorInterface from "../../interfaces/error.interface.js";
import BookEmergencySeatInterface from "../../interfaces/public.interface.js";
import { Request, Response } from "express";
import PublicService from "../../services/public/public.service.js";


 class PublicController {
 
    async bookEmergencySeat(req: Request, res: Response) {
        try {
            const bookEmergencySeatData = req.body as BookEmergencySeatInterface;

            const book = await new PublicService().bookEmergencySeat(bookEmergencySeatData);

            return res.status(200).json(book);

        } catch (error: any & ErrorInterface) {
            throw Error(error.message);
        }
    }
}

export default new PublicController();