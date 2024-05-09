export class Care {
    product!: string;
    area!: string;
    sex!: string;
    amount!: number;
    brand!: string;
    skinType!: string;
    comment!: string;
    price!: number;
    orderDate!: Date;
    id!: number;
    constructor(init?: Partial<Care>) {
        Object.assign(this, init);
    }
}