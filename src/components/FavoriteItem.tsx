import {IconButton, ListItem, ListItemText, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type {FavoriteItemProps} from "../interface/favorite-item-props.type.ts";
import React from "react";

export default function FavoriteItem({ joke, onOpen, onDelete }: FavoriteItemProps) {
    return (
        <ListItem
            onClick={() => onOpen(joke)}
            secondaryAction={
                <IconButton
                    edge="end"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(joke);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            }
            sx={{ cursor: "pointer" }}
        >
            <ListItemText
                primary={
                    <Typography
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {joke.value}
                    </Typography>
                }
            />
        </ListItem>
    );
}