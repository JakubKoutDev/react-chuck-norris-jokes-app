import {Alert, Snackbar} from "@mui/material";
import React from "react";

export const InfoSnackbar = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert severity="info" onClose={onClose}>
            Maximum reached. Oldest joke was replaced.
        </Alert>
    </Snackbar>
);