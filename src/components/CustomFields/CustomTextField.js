import { 
  TextField,
  withStyles,
} from "@material-ui/core";
import './CustomTextField.css';

const CustomTextField = withStyles({
  root: {
    margin: "15px 15px",
    width: "100%",
    height: "100%",
    variant: "outlined",
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black"
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "black"
    }
  }
})(TextField);

export default CustomTextField;