import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult : <T>(pred: (x: T) => boolean, a: T[]) => Result<T>  = (pred, a) => {
    const newA = a.filter(y => pred(y)); 
    return newA.length > 0 ? makeOk(newA[0]) : makeFailure("No Such Element");
};

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 : (a: number[]) => Result<number> = (a) => {
    const squarA = a.map(x  => x*x);
    return bind(findResult(num => num % 2 === 0 , squarA), makeOk);
};

export const returnSquaredIfFoundEven_v3 : (a: number[]) => number = (a) => {
    
    const squar : (num: number) => number = (num) => num * num;
    const returnMinOne : (str: string) => number = (str) => str === "No Such Element"? -1 : -1;
    return either(findResult(num => num % 2 === 0 , a), squar, returnMinOne);
};