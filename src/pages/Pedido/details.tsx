import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import ListagemItensAdicionado from './componentes/listagemItensDetalhes';
import {PedidoResponse} from '../../interfaces/PedidoInterface';

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Button} from '@material-ui/core';

export default function DialogDetalhePedido(props: any){
    const idPedido: number = Number(props.idPedido);
    const [detalhePedido, setDetalhePedido] = useState<PedidoResponse>();

    async function fetchPedido(){
        const rota = '/Pedido/Detalhe/' + idPedido;
        await api.post(rota).then(({data}) => setDetalhePedido(data));
    }

    useEffect(() => {fetchPedido()});

    return(
        <React.Fragment>
            {detalhePedido &&
                <Dialog open={props.valorDialog} onClose={props.fecharDialog}>
                    <DialogTitle>
                        <strong>Descrição do Pedido: </strong>
                        {detalhePedido.descricao}
                    </DialogTitle>

                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DialogContentText>
                                    <strong>Situação do Pedido: </strong>
                                    {props.tipoSituacao(detalhePedido.situacao)}
                                </DialogContentText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListagemItensAdicionado 
                                    listagemItensAdicionado={detalhePedido.itens}
                                    valorFinalPedido={detalhePedido.valor_total}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
    
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={props.fecharDialog}>
                            Voltar
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </React.Fragment>
    );
}