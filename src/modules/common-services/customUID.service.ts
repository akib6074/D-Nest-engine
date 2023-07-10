import { HttpException, Injectable } from "@nestjs/common";
import * as moment from "moment";
import { InjectModel } from "@nestjs/sequelize";
import { ItsmUniqueId } from "../itsm_unique_id/itsm_unique_id.model";
@Injectable()
export class CustomeUIDService {
    constructor(
        @InjectModel(ItsmUniqueId)
        private uniqueIdLogicRepository: typeof ItsmUniqueId
    ) {}
    generateCustomeId = async (
        prefix: string,
        format: string
    ): Promise<any> => {
        try {
            const customUserId = await this.uniqueIdLogicRepository.findOne({
                where: { id_for: prefix },
            });
            console.log('-----uuid',customUserId);
            let number: number;
            let format = customUserId.id_format;
            const id = customUserId?.id;
            
            if (customUserId.reset_flag === 1) {
                number = 1000000000000000 + customUserId.starting_id;
                customUserId.last_gen_id = 1;
                customUserId.reset_flag = 0;
                await this.uniqueIdLogicRepository.update({last_gen_id: 1, reset_flag: 0},{where:{id}, returning: true});
            } else {
                number = 1000000000000000 + customUserId.last_gen_id + 1;
                const x = await this.uniqueIdLogicRepository.update({last_gen_id: customUserId.last_gen_id + 1},{where:{id}, returning: true});
            }
            
            let serial = number.toString();
            serial = serial.slice(16-customUserId.id_length, 16);
            let serialNo = format + serial;
            if(format == null){
                return customUserId.last_gen_id + 1;
            }
            return serialNo;
        } catch (error) {
            throw error;
        }
    };
}
