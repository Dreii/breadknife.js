import { Split, Test, States } from './types';
declare class Breadknife {
    tests: Test[];
    states: States;
    constructor();
    init(configuration: any): void;
    getTests(): Test[];
    getTestSlice(id: string): string;
    forceTestSlice(id: string, state: string): void;
}
declare const breadknife: Breadknife;
export default breadknife;
export declare const HALF_AND_HALF: Split;
export declare const THREE_WAY: Split;
export declare const FOUR_WAY: Split;
