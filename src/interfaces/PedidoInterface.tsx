export interface Pedido {
    id: number;
    data: Date;
    descricao: string;
    situacao: string;
    valor_total: number;
}

export interface RequestPedido {
    descricao: string;
    itens_pedido: ItensPedido[];
}

export interface ItensPedido {
    id: number;
    desconto: number;
}

export interface ItemResponse {
    codigo: string;
    nome: string;
    valor_unitario: number;
    desconto: number;
    valor_final: number;
}

export interface PedidoResponse {
    descricao: string;
    situacao: number;
    itens: ItemResponse[];
    valor_total: number;
}