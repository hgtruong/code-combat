import { 
  TextField,
  withStyles,
} from "@material-ui/core";
import './CustomTextField.css';

const CustomTextField = withStyles({
  root: {
    margin: "10px 10px",
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