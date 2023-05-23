import {RecommendedMovies} from "./RecommendedMovies/RecommendedMovies";
import Box from "@mui/material/Box";
import {Pagination} from "@mui/material";
import React from "react";

export function MovieRecommendationSection({recommendedMovies, totalPages, page, handlePageChange}) {
    return (<>
        <RecommendedMovies movies={recommendedMovies}/>
        <Box display="flex" justifyContent="center" sx={{marginBottom: "5vh"}}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange}/>
        </Box>
    </>)
}