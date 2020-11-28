import React, {useState, useEffect, useCallback} from 'react';
import api from '../../services/api';

import DialogNovoPedido from './create';
import DialogDetalhePedido from './details';
import {Pedido} from '../../interfaces/PedidoInterface';

import {format} from 'date-fns';

import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

import {TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Paper, Fab, IconButton} from '@material-ui/core';

export default function ListagemPedido(){
    const [listagemPedidos, setListagemPedidos] = useState<Pedido[]>([]);
    const [atualizarTabela, setAtualizarTabela] = useState<boolean>(false);
    const [dialogAdicionar, setDialogAdicionar] = useState<boolean>(false);
    const [dialogDetalhe, setDialogDetalhe] = useState<boolean>(false);
    const [detalheId, setDetalheId] = useState<number>(0);
    
    useEffect(() => {
        async function fetch() {
            await api.get('/Pedido').then(({data}) => setListagemPedidos(data))
        }
        fetch();
    }, [atualizarTabela]);
    
    const tipoSituacao = (situacao: number) => {
        if (situacao === 0)
            return(<span style={{color: "blue"}}>Em Analise</span>);
        else if (situacao === 1)
            return(<span style={{color: "green"}}>Aprovado</span>);
        else
            return(<span style={{color: "red"}}>Cancelado</span>);
    }

    const aprovarPedido = useCallback(async (id) => {
        const rota = '/Pedido/Aprovar/' + id;
        await api.post(rota);

        setAtualizarTabela(!atualizarTabela)
      }, [atualizarTabela]);

    const cancelarPedido = useCallback(async (id) => {
        const rota = '/Pedido/Cancelar/' + id;
        await api.post(rota);

        setAtualizarTabela(!atualizarTabela)
    }, [atualizarTabela]);

    function BotoesSituacao(props: any){
        if (props.situacao === 0){
            return(
                <IconButton color="primary" onClick={() => aprovarPedido(props.id)}>
                    <CheckCircleIcon/>
                </IconButton>
            );
        }
        else {
            return(
                <IconButton color="secondary" onClick={() => cancelarPedido(props.id)}>
                    <CancelIcon/>
                </IconButton>
            );
        }
    }

    const TabelaPedido = () => {
        return(
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nr. Pedido</TableCell>
                            <TableCell align="center">Descrição</TableCell>
                            <TableCell align="center">Situação</TableCell>
                            <TableCell align="center">Data</TableCell>
                            <TableCell align="center">Valor Total</TableCell>
                            <TableCell align="center">
                                <Fab color="primary" aria-label="Add" onClick={() => setDialogAdicionar(true)}>
                                    <AddIcon />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listagemPedidos.map( pedido => (
                            <TableRow key={pedido.id}>
                                <TableCell align="center">{pedido.id}</TableCell>
                                <TableCell align="center">{pedido.descricao}</TableCell>
                                <TableCell align="center">{tipoSituacao(Number(pedido.situacao))}</TableCell>
                                <TableCell align="center">{format(new Date(pedido.data), 'dd/MM/yyyy HH:mm')}</TableCell>
                                <TableCell align="center">{pedido.valor_total} R$</TableCell>
                                <TableCell>
                                    <IconButton color="inherit" onClick={() => {
                                        setDetalheId(pedido.id)
                                        setDialogDetalhe(true)
                                    }}>
                                        <InfoIcon />
                                    </IconButton>
                                    {Number(pedido.situacao) !== 2 &&
                                        <BotoesSituacao situacao={pedido.situacao} id={pedido.id} />
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return(
        <React.Fragment>
            <h1>Listagem de Pedido</h1>     
            <TabelaPedido />

            <DialogNovoPedido 
                valorDialog={dialogAdicionar} 
                alertSucesso={() => alert("Pedido adicionado com sucesso!")} 
                fecharDialog={() => {
                    setDialogAdicionar(false)
                    setAtualizarTabela(!atualizarTabela)
                }}
            />
            {detalheId !== 0 &&
                <DialogDetalhePedido 
                    idPedido={detalheId}
                    tipoSituacao={tipoSituacao}
                    valorDialog={dialogDetalhe}
                    fecharDialog={() => {
                        setDialogDetalhe(false)
                        setAtualizarTabela(!atualizarTabela)
                    }}
                />
            }
        </React.Fragment>
    );
}