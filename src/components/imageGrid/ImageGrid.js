import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 440,
    height: 332,
  },
}));



const ImageGridList = ({images}) => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="imageGrid">
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {images.map((tile, index) => (
          <GridListTile key={index} cols={1}>
            <img key={index} src={tile} alt={"Image "+tile.index} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default ImageGridList