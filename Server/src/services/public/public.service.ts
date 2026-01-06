import ErrorInterface from "../../interfaces/error.interface.js";
import BookEmergencySeatInterface from "../../interfaces/public.interface.js";
import PublicRepo from "../../repositories/public.repo.js";


export default class PublicService {
    async bookEmergencySeat(bookEmergencySeatData: BookEmergencySeatInterface) {
        try {
            const result = await new PublicRepo().bookEmergencySeat(bookEmergencySeatData);
            return result;
        } catch (error: any & ErrorInterface) {
            throw Error(error.message);
        }
    }
}
