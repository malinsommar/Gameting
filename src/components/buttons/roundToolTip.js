import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const RoundToolTip = ({icon, toolText, color, onClick, className}) => {
    const classes = makeStyles((theme) => ({
        fab: {
            margin: theme.spacing(2),
        },
        absolute: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(3),
        },
    }));

    return (
      <div>
        <Tooltip className={className} title={toolText} aria-label={toolText}>
          <Fab color={color} className={classes.fab} onClick={onClick}>
            {icon}
          </Fab>
        </Tooltip>
      </div>
    );
}

export default RoundToolTip;