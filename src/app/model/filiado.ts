
import { Endereco } from "./endereco";
import { InscricaoCamp } from "./inscricaoCamp";
import { Pessoa } from "./pessoa";
import { Telefone } from "./telefone";

export class Filiado{

    id?: number;
    pessoa?: Pessoa;
    endereco?: Endereco;   
    atirador?: boolean;  
    colecionador?: boolean;  
    cacador?: boolean;    
    instrutor?: boolean;   
    ativo?: boolean;    
    foto?: string;
    cr?: string;
    validadeCr?: Date;
    inscricoes?: InscricaoCamp[];
    telefones?: Telefone[];
}