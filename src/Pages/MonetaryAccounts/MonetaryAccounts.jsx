import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PaperSectionHeader from "../../Components/PaperSectionHeader";
import Content from "../../Components/Content/Content";
import MonetaryAccountItem from "./MonetaryAccountItem";

import useMonetaryAccounts from "../../Redux/Hooks/useMonetaryAccounts";

const styles = theme => ({});

const MonetaryAccounts = ({ classes }) => {
    const { monetaryAccounts, monetaryAccountsLoading, updateMonetaryAccounts } = useMonetaryAccounts();

    let monetaryAccountComponents = null;
    if (monetaryAccounts) {
        monetaryAccountComponents = monetaryAccounts
            .filter(monetaryAccount => {
                return monetaryAccount.status === "ACTIVE";
            })
            .map(monetaryAccount => {
                return (
                    <MonetaryAccountItem
                        key={monetaryAccount.id + monetaryAccount.color}
                        monetaryAccount={monetaryAccount}
                    />
                );
            });
    }

    return (
        <Content title="bunqAutomation - Monetary accounts">
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <PaperSectionHeader
                        variant="h5"
                        title="Monetary accounts"
                        secondaryIcon={true}
                        onClick={updateMonetaryAccounts}
                        loading={monetaryAccountsLoading}
                    />
                </Grid>

                {monetaryAccountsLoading && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Loading</Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Grid container spacing={8}>
                        {monetaryAccountComponents}
                    </Grid>
                </Grid>
            </Grid>
        </Content>
    );
};

export default withStyles(styles)(MonetaryAccounts);
