import React from 'react';

import {ItemResponse} from '../../../interfaces/PedidoInterface';

import {List, ListItem, ListItemAvatar, ListItemText, Avatar, Grid, Card, CardContent} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

export default function ListagemItens(props: any){
    const listaTodosItens: ItemResponse[] = props.listagemItensAdicionado;
    const valorFinal: number = props.valorFinalPedido;

    return(
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <h2>Itens adicionados</h2>
                <Card variant="outlined">
                    <CardContent>
                        <List>
                            {listaTodosItens.map(item => (
                                <ListItem key={item.codigo}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <CreateIcon />
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={item.nome + " - " + item.valor_final + " R$"} 
                                        secondary={"Preço unitário: " + item.valor_unitario + " R$ | Desconto: " + item.desconto + " R$"}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
                <h3>Valor total: {valorFinal} R$</h3>
            </Grid>
        </Grid>
    );
}