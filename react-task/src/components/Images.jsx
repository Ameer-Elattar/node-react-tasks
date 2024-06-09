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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LinearProgress from "@mui/material/LinearProgress";

export function Images() {
  const [Images, setImages] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllImages();
        let pics = [];
        res.data.photos.map((photo) => {
          pics.push({ name: photo.alt, src: photo.src.original });
        });
        setImages(pics);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setFetchError(true);
      }
    })();
  }, []);

  const handelAddTofavorite = (image) => {
    addImageToFavorite(image);
  };
  return (
    <>
      <Box m={3}>
        <Grid container spacing={1}>
          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : fetchError ? (
            <Alert
              severity="error"
              sx={{ width: "100%" }}
              style={{ fontSize: "40px", fontWeight: "bold" }}
            >
              <AlertTitle style={{ fontSize: "30px" }}>Error</AlertTitle>
              Couldn't fetch data from server
            </Alert>
          ) : (
            Images &&
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
            })
          )}
        </Grid>
      </Box>
    </>
  );
}
