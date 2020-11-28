import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import {Item} from '../../interfaces/ItemInterface';
import DialogNovoItem from './create';

import AddIcon from '@material-ui/icons/Add';
import {TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Paper, Fab} from '@material-ui/core';

export default function ListagemItem(){
    const [listagemItem, setListagemItem] = useState<Item[]>([]);
    const [atualizarTabela, setAtualizarTabela] = useState<boolean>(false);
    const [dialogAdicionar, setDialogAdicionar] = useState<boolean>(false);

    useEffect(() => {
        async function fetch() {
            await api.get('/Item').then(({data}) => setListagemItem(data))
        }
        fetch();
    }, [atualizarTabela]);

    const TabelaItem = () => {
        return(
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Codigo</TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Valor Unitario</TableCell>
                            <TableCell align="center">
                                <Fab color="primary" aria-label="Add" onClick={() => setDialogAdicionar(true)}>
                                    <AddIcon />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listagemItem.map(item => (
                            <TableRow>
                                <TableCell align="center">{item.codigo}</TableCell>
                                <TableCell align="center">{item.nome}</TableCell>
                                <TableCell align="center">{item.valor_unitario} R$</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return(
        <React.Fragment>
            <h1>Listagem de Item</h1>
            <TabelaItem />

            <DialogNovoItem
                valorDialog={dialogAdicionar} 
                alertSucesso={() => alert("Item adicionado com sucesso!")} 
                fecharDialog={() => {
                    setDialogAdicionar(false)
                    setAtualizarTabela(!atualizarTabela)
                }}
            />
        </React.Fragment>
    );
}