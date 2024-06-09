import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { getFavoriteImages } from "../API/firestoreDB";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export function Favorite() {
  const [Images, setImages] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFavoriteImages();
        setImages(res);
      } catch (error) {
        console.log(error);
        setFetchError(true);
      }
    })();
  }, []);
  return (
    <>
      <Box m={3}>
        <Grid container spacing={1}>
          {fetchError ? (
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
