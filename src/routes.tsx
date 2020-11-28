import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Menu from './pages/Menu/index';

import PedidoListagem from './pages/Pedido/index';
import ItemListagem from './pages/Item/index';

import {createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default function Routes(){
    const classes = useStyles();

    return(
        <BrowserRouter>
            <Menu/>

            <main className={classes.content}>
                <CssBaseline/>
                <Container maxWidth="md">
                    <Route exact path="/" component={PedidoListagem} />
                    <Route exact path="/Item" component={ItemListagem} />
                </Container>
            </main>  
        </BrowserRouter>
    );
}