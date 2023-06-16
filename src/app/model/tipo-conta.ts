import {TipoContaStatus} from "./tipo-conta-status";

export class TipoConta{
  id!: number;
  nome!: string;
  contaCartao!: boolean;
  tipoContaStatus!: TipoContaStatus;
}
