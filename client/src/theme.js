import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),

    h1 : {
      fontFamily: ['Caesar Dressing', 'sans-serif'].join(',')
    }
 },
})

export default theme;