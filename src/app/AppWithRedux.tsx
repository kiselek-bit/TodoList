import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


function AppWithRedux() {


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={'menuButton'} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={'title'}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default AppWithRedux;



