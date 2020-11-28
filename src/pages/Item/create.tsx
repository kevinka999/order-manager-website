import React, {useState, useCallback} from 'react';
import api from '../../services/api';

import {RequestItem} from '../../interfaces/ItemInterface';

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Grid, Input, InputAdornment} from '@material-ui/core';

const DialogNovoItem = (props: any) => {
    const [codigoItem, setCodigoItem] = useState("");
    const [nomeItem, setNomeItem] = useState("");
    const [valorUnitarioItem, setValorUnitarioItem] = useState("");

    const resetarTodosStates = () => {
        setCodigoItem("");
        setNomeItem("");
        setValorUnitarioItem("");
    }

    const validarCampos = (codigo: string, nome: string, valorUnitario: string) => {
        if (codigo === "" || nome === "" || valorUnitario === "")
            return false;

        return true;
    }

    const handleAdicionarItem = useCallback(async (codigo, nome, valorUnitario) => {
        try {
            if (validarCampos(codigo, nome, valorUnitario)){
                const dataBody: RequestItem = {
                    codigo: codigo,
                    nome: nome,
                    valor_unitario: Number(valorUnitario)
                };

                await api.post('/Item/Criar', dataBody).then(() => {
                    resetarTodosStates()
                    props.alertSucesso()
                    props.fecharDialog()
                });
            } else {
                alert("Houve um problema ao adicionar, verifique os campos!");
            }
        } catch(error) {
            alert("Houve um problema ao adicionar!");
        }
    }, [props]);

    return (
        <Dialog open={props.valorDialog} onClose={props.fecharDialog}>
            <DialogTitle>Adicionar Item</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os campos do formulario para cadastrar</DialogContentText>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField label="Codigo" fullWidth value={codigoItem} onChange={(e) => setCodigoItem(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Nome" fullWidth value={nomeItem} onChange={(e) => setNomeItem(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <br/>
                        <Input
                            type="number" 
                            fullWidth
                            placeholder="Valor Unitário"
                            value={valorUnitarioItem} 
                            onChange={(e) => setValorUnitarioItem(e.target.value)}
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>} 
                        />   
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="default" onClick={props.fecharDialog}>
                    Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleAdicionarItem(codigoItem, nomeItem, valorUnitarioItem)}>
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogNovoItem;