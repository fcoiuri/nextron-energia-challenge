import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiURl } from "../../api";
import { deleteCookie } from "../../utils";
import { TabPanel } from "../../components/TabPanel";
import { Dashboard } from "./_dashboard";
import { DataContext } from "../../contexts";
import { getPaymentMethods } from "../../contexts/actions/payments";
import { Box, Container, Grid, Paper } from "@mui/material/";
// import { getPaymentMethods } from "../../contexts/actions/payments/paymentMethods";
// import { GlobalContext } from "../../contexts/UserContext";

export default function Session() {
  const router = useRouter();
  const { state, fetchSession } = React.useContext(DataContext);
  const { session, loading, error } = state;

  // const [state, setState] = useState<any>({
  //   isFetching: false,
  //   message: null,
  //   user: null,
  //   payments: null
  // });

  // const { isFetching, message, user, payments = {} } = state;

  // const getUserInfo = async () => {
  //   setState({ ...state, isFetching: true, message: "fetching details..." });
  //   try {
  //     const res = await fetch(`${apiURl}/session`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: (window as any).token
  //       }
  //     }).then((res) => res.json());

  //     const { success, user } = res;
  //     if (!success) {
  //       router.push("/login");
  //     }
  //     setState({ ...state, user, message: null, isFetching: false });
  //   } catch (e: any) {
  //     setState({ ...state, message: e.toString(), isFetching: false });
  //   }
  // };

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  React.useEffect(() => {
    fetchSession();
    if (!session.success!) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {session.user! && session.user?.name}</h1>

      <div className="message">{loading ? "fetching details.." : error}</div>
      {/* <Box sx={{ display: "flex" }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TabPanel>
              <Dashboard />
            </TabPanel>
          </Paper>
        </Grid>
      </Box> */}
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <TabPanel>
                <Dashboard />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
