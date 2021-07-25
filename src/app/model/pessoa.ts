import { Perfil } from "./pefil";

export class Pessoa{ 
    id?: number;
    nome?: string;
    email?: string;
    cpf?: string;
    rg?: string;
    dataexp?: Date;
    datanasc?: Date;
    naturalidade?: string;
    nomemae?: string;
    nomepai?: string;
    perfis?: Perfil[];
}