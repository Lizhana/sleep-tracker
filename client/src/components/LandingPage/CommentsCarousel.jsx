import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const allComments = [
  {
    name: 'Carlos Canguro',
    rate: '3',
    comment: 'Mi sueño mejoro al poder llevar un registro y ver que comidas me afectan antes de ir a dormir.'
  },
  {
    name: 'Tina Tazmania',
    rate: '4',
    comment: 'Soy una persona muy tranquila, luego de ver las graficas de sueño de la toda la semana me di cuenta de que no me despierto mas que por un vaso de agua en la noche :-)'
  },
  {
    name: 'Pepe Perezoso',
    rate: '5',
    comment: 'Yo solia sentirme muy cansado durante el dia, desde que descargo el PDF con el registro de sueño soy mas conciente lo poco que dormia.'
  },
];

function SwipeableTextMobileStepper({ commentsState }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  // const maxSteps = allComments.length;

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const currentComments = useSelector((state) => state.comments);

  //   {
  //     name: 'noName',
  //     rate: 1,
  //     comment: 'noComment',
  //   },
  //   {
  //     name: 'noName',
  //     rate: 1,
  //     comment: 'noComment',
  //   },
  //   {
  //     name: 'noName',
  //     rate: 1,
  //     comment: 'noComment',
  //   },
  // ])


  return (
    <Box sx={{ maxWidth: 500, flexGrow: 1 }}>

      <Grid
        container
        justifyContent='center'
        direction='column'
        alignItems='center'
        spacing={3}
      >
        <Grid
          item
        >

          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              pl: 2,
              bgcolor: 'background.default',
            }}
          >

            {
              currentComments.data[activeStep] !== undefined ?
                <Typography
                  variant='h4'
                >
                  {currentComments.data[activeStep].name}
                </Typography>
                :
                <Typography>
                  {allComments[activeStep].name}
                </Typography>
            }

          </Paper>
        </Grid>
        <Grid
          item
        >

          {
            currentComments.data[activeStep] !== undefined ?
              <Typography
                variant='h5'
              >
                {currentComments.data[activeStep].rate}
              </Typography>
              :
              <Typography>
                {allComments[activeStep].rate}
              </Typography>
          }
        </Grid>

        <Grid
          item
        >

          {
            currentComments.data[activeStep] !== undefined ?

              <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {currentComments.data?.map((step, index) => (
                  <div key={step.name}>
                    {Math.abs(activeStep - index) <= 2 ?
                      <Typography
                        variant='h5'
                      >
                        {currentComments.data[activeStep].comment}
                      </Typography>
                      :
                      <Typography
                        variant='h5'
                      >
                        {allComments[activeStep].comment}
                      </Typography>
                    }
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              :
              <Typography>Cargando</Typography>
          }
        </Grid>
      </Grid>

    </Box >
  );
}

export default SwipeableTextMobileStepper;