import React, {useState, useCallback, useEffect} from 'react';
import api from '../../services/api';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {Item} from '../../interfaces/ItemInterface';
import {RequestPedido, ItensPedido} from '../../interfaces/PedidoInterface';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ListagemItens from './componentes/listagemItens';

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Grid, NativeSelect, IconButton, Input, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
        width: "100%",
    },
    textfield: {
        width: "80%",
    },
    button: {
        width: "10%",
        marginTop: "5px",
        marginLeft: "10%",
    }
  }),
);

export default function DialogNovoPedido(props: any) {
    const [listagemItem, setListagemItem] = useState<Item[]>([]);
    const [itensPedido, setItensPedido] = useState<ItensPedido[]>([]);

    const [itemId, setItemId] = useState<number>(0);
    const [descricao, setDescricao] = useState<string>("");
    const [desconto, setDesconto] = useState<string>("");
    const [valorAtual, setValorAtual] = useState<number>(0);
    
    const classes = useStyles();
    
    async function fetchItens(){
        await api.get('/Item').then(({data}) => setListagemItem(data))
    }

    useEffect(() => {fetchItens()}, []);
    
    const atualizarItem = (id: number) => {
        setItemId(id);

        const itemAtual = listagemItem.find(item => item.id === id);
        if (itemAtual){
            setValorAtual(itemAtual.valor_unitario);
        }
    }

    const adicionarItem = (idItem: number, desconto: number, valorItem: number) => {
        const nenhumItemAdicionado = idItem !== 0;
        const listaVazia = itensPedido.length <= 0;
        const itemAdicionadoNaLista = itensPedido.some(({id}) => id !== idItem);

        if(nenhumItemAdicionado){
            if(listaVazia || itemAdicionadoNaLista){
                if (desconto >= valorItem){
                    alert("Desconto não pode ser maior ou igual a o valor do Item");
                }
                else {
                    const novoItem: ItensPedido = { id: idItem, desconto: desconto};
                    setItensPedido(prevState => ([...prevState, novoItem]));
                    setDesconto("");
                }
            }
            else{
                alert("Item já está adicionado no pedido.");
            }
        }
        else{
            alert("Selecione um item para adicionar a lista.")
        }

    }

    const removerItem = (idRemover: number) => {
        setItensPedido(itensPedido.filter(({id}) => id !== idRemover));
    }

    const resetarTodosStates = () => {
        setItensPedido([]);
        setDescricao("");
        setDesconto("");
        setItemId(0);
        setValorAtual(0);
    }

    const validarCampos = (descricao: string, itensPedido: ItensPedido[]) => {
        if(descricao !== "" && itensPedido.length >= 1)
            return true;

        return false;
    }

    const handleAdicionarPedido = useCallback(async (descricao: string, itensPedido: ItensPedido[]) => {
        try {
            if (validarCampos(descricao, itensPedido)){
                const dataBody: RequestPedido = {
                    descricao: descricao,
                    itens_pedido: itensPedido
                };

                await api.post('/Pedido/Criar', dataBody).then(() => {
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
            <DialogTitle>Adicionar Pedido</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <DialogContentText>Preencha os campos do formulario para cadastrar</DialogContentText>

                    <Grid item xs={12}>
                        <TextField label="Descrição do Pedido" fullWidth value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <NativeSelect value={itemId} onChange={(e) => atualizarItem(Number(e.target.value))} className={classes.select}>
                            <option value={0} disabled>Selecione um item</option>
                            {listagemItem.map(item => (
                                <option key={item.id} value={item.id}>{item.nome}</option>
                            ))}
                        </NativeSelect>

                        {valorAtual !== 0 && 
                            <span style={{color: "red"}}>Preço unitário: {valorAtual}$</span>
                        }
                    </Grid>

                    <Grid item xs={12}>
                        <Input
                            type="number" 
                            placeholder="Desconto"
                            value={desconto} 
                            className={classes.textfield}
                            onChange={(e) => setDesconto(e.target.value)}
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>} 
                        />
                        <IconButton className={classes.button} onClick={() => adicionarItem(Number(itemId), Number(desconto), Number(valorAtual))}>
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12}>
                        {itensPedido.length > 0 &&
                            <ListagemItens listaTodosItem={listagemItem} listaItensAdicionados={itensPedido} removerId={removerItem} />
                        }
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="default" onClick={props.fecharDialog}>
                    Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleAdicionarPedido(descricao, itensPedido)}>
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    );
}