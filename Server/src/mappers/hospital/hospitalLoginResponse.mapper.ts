import { ResponseDTO } from "../../DTOClasses/response.DTO.js";
import { HospitalLoginResponseInterface } from "../../interfaces/hospital.interface.js";


export default function hospitalLoginResponseMapper(resData: HospitalLoginResponseInterface) {
    const res = new ResponseDTO<HospitalLoginResponseInterface>();
    res.setStatus(true);
    res.setMessage("Hospital logged in successfully!");
    res.setData(resData);
    
    return res;
}