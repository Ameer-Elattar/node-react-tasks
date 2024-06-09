import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { getFavoriteImages } from "../API/firestoreDB";
import { useState } from "react";

export function Favorite() {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getFavoriteImages();
      setImages(res);
    })();
  }, []);
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
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}
