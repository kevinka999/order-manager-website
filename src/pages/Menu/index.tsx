import React from 'react';
import {Link} from 'react-router-dom';

import {createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CreateIcon from '@material-ui/icons/Create';

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  }),
);

export default function Menu(){
  const classes = useStyles();

  return(
    <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}} anchor="left">
      <List>
        <ListItem>
          <ListItemText primary="Mercado" secondary="Gerenciador de Pedidos" />
        </ListItem>

        <Divider />

        <ListItem button component={Link} to={'/'}>
          <ListItemIcon>
            <ShoppingCartIcon/>
          </ListItemIcon>
          <ListItemText primary="Pedidos" />
        </ListItem>

        <ListItem button component={Link} to={'/Item'}>
          <ListItemIcon>
            <CreateIcon/>
          </ListItemIcon>
          <ListItemText primary="Itens" />
        </ListItem>

        <Divider />
      </List>
    </Drawer>
  );
}