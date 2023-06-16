import {Cidade} from "./cidade";

export class Fornecedor {
  id!: number;
  nome!: string;
  razaoSocial!: string;
  cnpj!: string;
  inscricaoEstadual!: string;
  endereco!: string;
  bairro!: string;
  complemento!: string;
  cep!: string;
  telefone!: string;
  cidade!: Cidade;
}
