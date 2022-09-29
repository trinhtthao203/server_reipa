import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./style.scss";
import Constants from "../../constants/index";
import { Container, FormHelperText, Button, Grid, TextField, FormControl, InputAdornment, IconButton, FilledInput, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff, ArrowForwardIos, TrendingUp } from "@mui/icons-material";
import Strings from "../../constants/strings";
import logo from "../../assets/images/logo.png";

import UserService from "../../services/user.service.js"
const userService = new UserService();

interface userInfo {
    phonenumber: string;
    password: string;
    showPassword: boolean;
}

interface errorPhoneNumber {
    error: boolean,
    helperText: string,
}

interface errorPassword {
    error: boolean,
    helperText: string,
}

function Login() {
    const [userInfo, setUserInfo] = React.useState<userInfo>({
        phonenumber: "",
        password: "",
        showPassword: false
    });

    const [errorPhoneNumber, setErrorPhoneNumber] = React.useState<errorPhoneNumber>({
        error: false,
        helperText: "",
    });

    const [errorPassword, setErrorPassword] = React.useState<errorPassword>({
        error: false,
        helperText: "",
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

    //check error datatype input
    const handleClickLogIn = async () => {
        if (userInfo.phonenumber === "" || userInfo.phonenumber === undefined) {
            setErrorPhoneNumber({
                error: true,
                helperText: Strings.Auth.PHONE_NUMBER_REQUIRED_MESSAGE
            })
        } else if (Constants.RegExp.PHONE_NUMBER.test(userInfo.phonenumber) == false) {
            setErrorPhoneNumber({
                error: true,
                helperText: Strings.Auth.PHONE_NUMBER_INVALID_MESSAGE
            })
        } else {
            setErrorPhoneNumber({
                error: false,
                helperText: ""
            })
        }

        if (userInfo.password === "" || userInfo.password === undefined) {
            setErrorPassword({
                error: true,
                helperText: Strings.Auth.PASSWORD_REQUIRED_MESSAGE
            })
        } else {
            setErrorPassword({
                error: false,
                helperText: ""
            })
        }

        if (errorPassword.error === false && errorPhoneNumber.error === false) {
            try {
                const result = await userService.handleLogIn(userInfo.phonenumber, userInfo.password);
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        }

    };

    return (
        <div className="container-login">
            <div className="background-color">
                <Container sx={{
                    width: {
                        xs: "100%",
                        sm: "400px",
                        md: "600px",
                        lg: "800px",
                        xl: "500px",
                    },
                }}>
                    <Grid container pt={Constants.Styles.VERTICAL_SPACE_SIZE_SMALL} style={{ textAlign: "center" }}>
                        <Grid item xs={12}>
                            <div className="logo-container">
                                <img className="logo-img" src={logo} alt="logo" />
                                <p className="logo-text">REIPA</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{ backgroundColor: Constants.Styles.CORLOR_WHITE, padding: " 30px 10px 10px 10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} >
                                <TextField
                                    id="outlined-multiline-flexible"
                                    error={errorPhoneNumber.error}
                                    label={Strings.Auth.PHONE_NUMBER}
                                    value={userInfo.phonenumber}
                                    style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: Constants.Styles.CORLOR_WHITE }}
                                    onChange={handleChange("phonenumber")}
                                    size={"small"}
                                />
                                <FormHelperText style={{ margin: 0, width: "100%", paddingLeft: "13px", color: Constants.Styles.COLOR_ERROR, fontSize: Constants.Styles.FONT_SIZE_SMALL }}>{errorPhoneNumber.helperText}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{ backgroundColor: Constants.Styles.CORLOR_WHITE }} variant="outlined">
                                <InputLabel style={{ padding: "3px 0px 0px 10px" }} htmlFor="outlined-adornment-password" error={errorPassword.error}>{Strings.Auth.PASSWORD}</InputLabel>
                                <OutlinedInput
                                    id="filled-adornment-password"
                                    error={errorPassword.error}
                                    type={userInfo.showPassword ? "text" : "password"}
                                    value={userInfo.password}
                                    onChange={handleChange("password")}
                                    style={{ backgroundColor: Constants.Styles.CORLOR_WHITE, margin: "10px 10px 0px 10px" }}
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
                                    label="Password"
                                    size="small"
                                />
                                <FormHelperText style={{ margin: 0, width: "100%", padding: "0px 0px 10px 23px", color: Constants.Styles.COLOR_ERROR, fontSize: Constants.Styles.FONT_SIZE_SMALL }}>{errorPassword.helperText}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{ backgroundColor: Constants.Styles.CORLOR_WHITE, padding: " 0px 10px 30px 10px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                <Button
                                    style={{ backgroundColor: Constants.Styles.COLOR_AMBER, height: Constants.Styles.TEXT_INPUT_HEIGHT, textAlign: "left" }}
                                    variant="contained"
                                    endIcon={<ArrowForwardIos className="button-icon" />}
                                    onClick={() => { handleClickLogIn() }}
                                    size={"small"}
                                >
                                    <p className="button-text">{Strings.Auth.SIGN_IN}</p>
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl style={{ marginTop: "7px", display: "flex", justifyContent: "flex-end", textAlign: "end" }}>
                                <a href="#" className="link-text-right">{Strings.Auth.FORGOT_PASSWORD}</a>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <p className="link-text-top">{Strings.Auth.DONT_HAVE_ACCOUNT}</p>
                            <a href="#" className="link-text-bottom">{Strings.Auth.SIGN_UP_NOW}</a>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
