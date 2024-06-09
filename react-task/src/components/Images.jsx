import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getAllImages } from "../API/pexelsAPI";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addImageToFavorite } from "../API/firestoreDB";

export function Images() {
  const [Images, setImages] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllImages();
        let pics = [];
        res.data.photos.map((photo) => {
          pics.push({ name: photo.alt, src: photo.src.original });
        });
        setImages(pics);
        // console.log(pics);
      } catch (error) {
        console.log(error);
        setFetchError(true);
      }
    })();
  }, []);

  const handelAddTofavorite = (image) => {
    addImageToFavorite(image);
    console.log(image);
  };
  return (
    <>
      <Box m={3}>
        <Grid container spacing={1}>
          {Images &&
            Images.map((image, index) => {
              return (
                <Grid item key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 250, width: 345 }}
                      image={image.src}
                      title={image.name}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {image.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<FavoriteIcon />}
                        onClick={() => {
                          handelAddTofavorite(image);
                        }}
                      >
                        Add to Favorite
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}
