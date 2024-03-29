import React, { Component, Fragment } from 'react';
import { history } from '../redux'
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { path } from '../utils'
import Home from '../routes/Home';
import Login from '../containers/Auth/login';
// import Login from '../routes/Login';
import Header from './Header/Header';
import System from '../routes/System';

import ConfirmModal from '../components/ConfirmModal';
import { CustomToastCloseButton } from '../components/CustomToast';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <CKEditor editor={ClassicEditor}>
                <Fragment>
                    <Router history={history}>
                        <div className="main-container">
                            <ConfirmModal />
                            {this.props.isLoggedIn && <Header />}
                            <span className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                </Switch>
                            </span>
                            <ToastContainer
                                className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                                autoClose={false} hideProgressBar={true} pauseOnHover={false}
                                pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                                closeButton={<CustomToastCloseButton />}
                            />
                        </div>
                    </Router>
                </Fragment>
            </CKEditor>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);