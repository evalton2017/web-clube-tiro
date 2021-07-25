import { Filiado } from "./filiado";
import { StatusEnum } from "./status.enum";

export class Requerimento{ 
    id?: number;
    filiado?: Filiado;
    colecionamento?: boolean;
    tiroDesp?: boolean;
    caca?: boolean;
    entDesp?: boolean;
    aquicaoAcessorio?: boolean;
    tipo?: string;
    calibre?: string;
    marca?: string;
    modelo?: string;
    quantidade?: number;
    fornecedor?: string;
    cnpj?: string;
    crForn?: string;
    dadosTec?: string;
    status?: StatusEnum;

}