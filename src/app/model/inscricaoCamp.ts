import { Campeonato } from "./campeonato";
import { Filiado } from "./filiado";

export class InscricaoCamp{

    id?: number;
    
    filiado?: Filiado;

    campeonato?: Campeonato;
   
    status?: string;

    ativo?: boolean;

    valor?: number;

    dataInscricao?: Date;

    dataPagamento?: Date;


}