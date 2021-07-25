import { Arma } from "./arma";
import { Categoria } from "./categoria";

export class Divisao {

    id?: number;    
    descricao?: string;
    categorias?: Categoria[];
    armas?: Arma[] = [];
     
}