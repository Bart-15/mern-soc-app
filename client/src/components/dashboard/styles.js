import { makeStyles } from "@material-ui/styles";

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },

    link : {
        color:'red',
    },

    action : {
        backgroundColor:'#67e083',
        color:'#fff',
        margin:'0 10px 5px 0',

        '&:hover' : {
            backgroundColor:'#333'
        }
    }
}));


export default styles;