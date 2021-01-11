import { Button, withStyles } from "@material-ui/core";

const CustomButton = withStyles({
    root: {
        color: '#fff',
        "&:disabled": {
            color: '#CCC',
            textDecoration: 'underline',
        }
    },

})(Button);

export default CustomButton;