export class Parfume {
    product!: string;
    volume!: number;
    brand!: string;
    notes!: string;
    sex!: string;
    comment!: string;
    orderDate!: Date;
    price!: number;
    id!: number;
    constructor(init?: Partial<Parfume>) {
        Object.assign(this, init);
    }
}