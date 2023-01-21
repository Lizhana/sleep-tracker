import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/index";
import { USER_ID } from "../../actions/constants";
// import "./PlanesPago.css";
// import style from "./PlanesPago.module.css";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Divider,
  Box,
  Paper
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet";


const Pricing = () => {
  const userId = window.localStorage.getItem(USER_ID);
  const currentUser = useSelector((state) => state?.users.currentUser);
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([]);
  const planExpirationDate = useSelector(
    (state) => state?.users.planExpirationDate
  );

  useEffect(() => {
    fetchPrices();
    if (currentUser === "") {
      dispatch(getUserById(userId));
    }
  }, [dispatch, currentUser, userId]);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_DEFAULT_URL}/plans/prices`
    );
    let allPlans = response.data;
    if (currentUser.hasUsedFreePlan === true) {
      allPlans = allPlans.filter((plan) => plan.unit_amount !== 0);
    }
    setPrices(allPlans);
  };

  const createSession = async (currentUser, priceId) => {
    const email = currentUser.email;

    const { data: response } = await axios.post(
      `${process.env.REACT_APP_DEFAULT_URL}/plans/session`,
      { priceId, email }
    );

    window.location.href = response.url; // obtener la url y redirigil al usuario a la url
  };

  const priceProps =
    <Box>
      <Typography>Registro de actividad fisica</Typography>
      <Typography>Registro de consumos diarios( alimentos y bebidas)</Typography>
      <Typography>Información de sueño conseguido diario y semanal</Typography>
      <Typography>Exporta tu información completa en formato PDF</Typography>
    </Box>
    ;

  const classes = useStyles();

  return (
    <Paper
      // className={classes.paperWraper}
      sx={{minHeight:'100vh'}}
    >

      <Helmet>
        <title>Planes | Sleep Tracker</title>
      </Helmet>

      <Grid
        container
        justifyContent="center"
        direction='column'
        alignItems='center'
        spacing={5}
        paddingRight={3}
        paddingLeft={3}

      >
        <Grid
          item
        >
          <Typography
            variant='h2'
            fontWeight='bold'
            paddingTop={5}
          >
            Planes
          </Typography>
        </Grid>

        <Grid
          item
        >
          <Typography
            variant='h6'
          >
            Te damos los mejores beneficios para que tengas una mejor calidad de sueño con nuestros planes
          </Typography>
        </Grid>

        <Grid
          item
        >

          <Grid
            container
            justifyContent="center"
            direction='row'
            alignItems='center'
            spacing={5}
          >

            {!currentUser.plan?.name
              ? prices.map((price, index) => (

                <Grid
                  item
                  key={`basico-${index}`}

                >

                  <Card
                  >
                    <CardContent >
                      <Grid
                        container
                        justifyContent="center"
                        direction='column'
                        alignItems='center'
                        spacing={5}
                      >

                        <Grid
                          item
                        >
                          <Typography
                            variant='h3'
                          >
                            {price.nickname}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                        >
                          <Typography
                            variant='h4'
                          >
                            ${price.unit_amount / 100}
                            <small>
                              /{price.recurring.interval}
                            </small>
                          </Typography>
                        </Grid>

                        {priceProps}
                        <Button
                          variant='contained'
                          size='large'
                          onClick={() => createSession(currentUser, price.id)}
                        >
                          Comprar
                        </Button>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

              ))
              : currentUser.plan?.name === "Basico"
                ? prices.slice(0).map((price, index) => (

                  <Grid
                    item
                    key={`estandar-${index}`}

                  >
                    <Card
                      variant='outlined'
                    >
                      <CardContent >

                        <Card
                        >
                          <CardContent >
                            <Typography
                              variant='h3'
                              fontWeight='bold'
                            >
                              {price.nickname}
                            </Typography>
                          </CardContent>
                        </Card>
                        <div >
                          <Typography
                            variant='h4'
                          >
                            ${price.unit_amount / 100}
                            <small
                            >
                              /{price.recurring.interval}
                            </small>
                          </Typography>
                          {priceProps}
                          <Button
                            variant='contained'
                            size='large'
                            onClick={() => createSession(currentUser, price.id)}
                          >
                            Comprar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                  </Grid>

                ))
                :
                currentUser.plan?.name === "Estandar"
                  ? prices.slice(1).map((price, index) => (

                    <Grid
                      item
                      key={`premium-${index}`}
                    >
                      <Card
                        variant='outlined'
                      >
                        <CardContent>
                          <Card
                          >
                          <CardContent >
                            <Typography
                              variant='h3'
                              fontWeight='bold'
                            >
                              {price.nickname}
                              </Typography>
                            </CardContent>
                          </Card>
                          <div >
                            <Typography
                              variant='h4'
                            >
                              ${price.unit_amount / 100}
                              <small
                              >
                                /{price.recurring.interval}
                              </small>
                            </Typography>
                            {priceProps}
                            <Button
                              variant='contained'
                              size='large'
                              onClick={() => createSession(currentUser, price.id)}
                            >
                              Comprar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                    </Grid>

                  ))
                  :
                  null}
          </Grid>

        </Grid>
      </Grid>

    </Paper>
  );
};

export default Pricing;

const useStyles = makeStyles(() => ({
  middle: {
    justifyContent: 'center'
  },

  paperWraper: {
    minHeight: '100vh'
  }

}));
