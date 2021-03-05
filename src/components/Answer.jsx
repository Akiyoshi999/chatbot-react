import React from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
  }),
);


const Answer = (props) => {
    // const classes = useStyles();

    return (
        <Button variant="contained" color="primary">
            {props.content}
        </Button>
    )
}

export default Answer