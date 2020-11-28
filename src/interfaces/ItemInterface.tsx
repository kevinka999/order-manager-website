export interface Item{
    id: number;
    codigo: string;
    nome: string;
    valor_unitario: number;
}

export interface RequestItem {
    codigo: string;
    nome: string;
    valor_unitario: number;
}