import { InscricaoCamp } from "./inscricaoCamp";
import { Modalidade } from "./modalidade";

export class Campeonato {
    id?: number;
    nome?: string;
    foto?: string;
    arquivo?: File;
    inicio?: Date;
    fim?: Date;
    temporada?: string;
    valor?: number;
    modalidades?: Modalidade[]=[];
    inscricoes?: InscricaoCamp[];
    url?: string;
    inscricao?: boolean;
}