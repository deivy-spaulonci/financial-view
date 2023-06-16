import {Fornecedor} from "./fornecedor";

export class LancamentoContaCartao {
  id!: number;
  data!: String;
  fornecedor!: Fornecedor;
  valor!: number;
  parcela!: number;
  totalParcela!: number;
}
