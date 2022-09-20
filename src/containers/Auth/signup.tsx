import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./style.scss";
// import { FormattedMessage } from "react-intl";
import Constants from "../../constants/index";
import { Button, Grid, TextField, FormControl, InputAdornment, IconButton, FilledInput, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff, ArrowForwardIos } from "@mui/icons-material";
import Strings from "../../constants/strings"

import logo from "../../assets/images/logo.png"

interface userInfo {
    phonenumber: string;
    password: string;
    showPassword: boolean;
}

function SignUp() {

    const [userInfo, setUserInfo] = React.useState<userInfo>({
        phonenumber: "",
        password: "",
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setUserInfo({
            ...userInfo,
            showPassword: !userInfo.showPassword
        });
    };

    const handleChange = (prop: keyof userInfo) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserInfo({ ...userInfo, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleLogIn = (
        // console.log(userInfo.phonenumber, userInfo.password)
        alert('aa')
    )

    return (
        <div className="container-login">
            <div className="background-color">
                <Grid container pt={Constants.Styles.VERTICAL_SPACE_SIZE_SMALL} style={{ textAlign: "center" }} >
                    <Grid item xs={12}>
                        <div className="logo-container">
                            <img className="logo-img" src={logo} alt="logo" />
                            <p className="logo-text">REIPA</p>
                        </div>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <TextField
                            id="outlined-multiline-flexible"
                            label={Strings.Auth.PHONE_NUMBER}
                            defaultValue={userInfo.phonenumber}
                            onChange={handleChange("phonenumber")}
                            className="input-login"
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FilledInput
                                id="filled-adornment-password"
                                type={userInfo.showPassword ? "text" : "password"}
                                value={userInfo.password}
                                onChange={handleChange("password")}
                                style={{ backgroundColor: Constants.Styles.CORLOR_WHITE }}
                                className="input-login"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {userInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <InputLabel htmlFor="filled-adornment-password" variant="filled" >{Strings.Auth.PASSWORD}</InputLabel>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <Button
                                style={{ backgroundColor: Constants.Styles.COLOR_AMBER, height: Constants.Styles.TEXT_INPUT_HEIGHT, textAlign: "left" }}
                                className="input-login"
                                variant="contained"
                                endIcon={<ArrowForwardIos className="button-icon" />}
                                onClick={() => { handleLogIn }}
                            >
                                <p className="button-text">{Strings.Auth.SIGN_IN}</p>
                            </Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <p className="link-text_top">{Strings.Auth.DONT_HAVE_ACCOUNT}</p>
                        <a href="#" className="link-text_bottom">{Strings.Auth.SIGN_UP_NOW}</a>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        navigate: (path: any) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo: any) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
