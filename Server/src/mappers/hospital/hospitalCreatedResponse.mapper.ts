import { ResponseDTO } from "../../DTOClasses/response.DTO.js";
import { HospitalCreatedResponseInterface } from "../../interfaces/hospital.interface.js";


export default function hospitalCreatedResponseMapper(resData: HospitalCreatedResponseInterface) {
    const res = new ResponseDTO<HospitalCreatedResponseInterface>();
    res.setStatus(true);
    res.setMessage("Hospital created successfully");
    res.setData(resData);
    
    return res;
}