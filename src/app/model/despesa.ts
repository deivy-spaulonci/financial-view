import {TipoDespesa} from "./tipo-despesa";
import {Fornecedor} from "./fornecedor";
import {FormaPagamento} from "./forma-pagamento";

export class Despesa {
  id!: number;
  tipoDespesa!: TipoDespesa;
  fornecedor!: Fornecedor;
  data!: String;
  formaPagamento!: FormaPagamento;
  valor!: number;
  obs!: string;
}
