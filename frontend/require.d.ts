/**
 * Created by user on 06.01.17.
 */
// declare var require: {
//     <T>(path: string): T;
//     (paths: string[], callback: (...modules: any[]) => void): void;
//     ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// };
declare function require(path: string): any;
// declare namespace angular {
//     interface IComponentOptions {
//         $routeConfig?: any[];
//     }
// }