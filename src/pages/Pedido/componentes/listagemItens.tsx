import React from 'react';
import {Item} from '../../../interfaces/ItemInterface';
import {ItensPedido} from '../../../interfaces/PedidoInterface';

import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, IconButton, Grid, Card, CardContent} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ListagemItens(props: any){
    let idsItensAdicionados: number[] = [];
    props.listaItensAdicionados.forEach((item: ItensPedido) => idsItensAdicionados.push(Number(item.id)))

    let listaTodosItens: Item[] = props.listaTodosItem;
    listaTodosItens = listaTodosItens.filter(({id}) => idsItensAdicionados.includes(id))

    const buscarDesconto = (id: number) => {
        const itemPedido: ItensPedido = props.listaItensAdicionados.find((item: ItensPedido) => item.id === id);
        return itemPedido.desconto;
    }

    const buscarValorTotalItem = (id: number) => {
        const item = listaTodosItens.find((item: Item) => item.id === id);
        if(item){
            const desconto: number = buscarDesconto(id);
            return item.valor_unitario - desconto;
        }

        return 0;
    }

    const buscarValorTotalPedido = () => {
        let valorTotal: number = 0;
        listaTodosItens.forEach((item) => {
            valorTotal += buscarValorTotalItem(item.id);
        })

        return valorTotal;
    }

    const removerItem = (id: number) => {
        props.removerId(id);
    }

    return(
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <h2>Itens adicionados</h2>
                <Card variant="outlined">
                    <CardContent>
                        <List>
                            {listaTodosItens.map(item => (
                                <ListItem key={item.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CreateIcon />
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={item.nome + " - " + buscarValorTotalItem(item.id) + " R$"} 
                                        secondary={"Preço unitário: " + item.valor_unitario + " R$ | Desconto: " + buscarDesconto(item.id) + " R$"}
                                    />
                                    
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => removerItem(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
                <h3>Valor total: {buscarValorTotalPedido()} R$</h3>
            </Grid>
        </Grid>
    );
}