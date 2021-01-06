import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {logoutTC} from "../features/Login/auth-reducer";


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType>(state => state.app.error)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const handleLogout = () => {
        dispatch(logoutTC())
    }

    if (!initialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                {error && <ErrorSnackbar/>}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={'menuButton'} color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" className={'title'}>
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Log out</Button>}
                    </Toolbar>
                </AppBar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
                <Container fixed>
                    <Switch>
                        <Route exact path={'/'} render={() => <TodolistsList/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
            </div>
        </BrowserRouter>
    );
}


export default App;



