export class Makeup {
    product!: string;
    amount!: number;
    brand!: string;
    color!: number;
    isHypoallergenic!: boolean;
    comment!: string;
    orderDate!: Date;
    price!: number;
    id!: number;
    constructor(init?: Partial<Makeup>) {
        Object.assign(this, init);
    }
}