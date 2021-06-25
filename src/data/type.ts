interface Sale {
    _id:{$oid:string};
    scenario_id:number;
    channel:string;
    market:string;
    period:number;
    sales:number;
    [key: string]:any;
}

export default Sale;