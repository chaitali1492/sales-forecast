import Sale from "../data/type";
import Data from "../data/sales.json";
export const getUniqueChannels = (data:Sale[]):{[key:string]:Sale[]} =>{
    const uniqueChannels:{[key:string]:Sale[]} = {};

    Data.forEach((obj:Sale)=>{
        if(!uniqueChannels[obj.channel]){
            uniqueChannels[obj.channel] = []
        }
        obj.date = new Date(obj.period);
        obj.dateStr = new Date(obj.period).toLocaleDateString("en-US");
        uniqueChannels[obj.channel].push(obj);
    })

    Object.keys(uniqueChannels).forEach(channel =>{
        uniqueChannels[channel].sort((a,b)=>{
            return a.period -b.period;
        })
    })

    return uniqueChannels;
}

export const getSalesData = ():Sale[] =>{
    return [...Data] as Sale[]
}

export default getUniqueChannels;