'use client'

import { Button, Typography, Card, TextField } from "@mui/material"
import { useState } from "react";


function AddCourse() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [price, setPrice] = useState('');
    const url = `/api/admin/addCourse`
    const handleAddCourse = async () => {
        try {
            const response = await fetch(`${url}`, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                    imageLink,
                    price,
                    published: true
                }),
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("token") // Uncomment if needed
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Course added successfully:", data);
            alert("Course added successfully");
        } catch (error) {
            console.error("Error adding course:", error);
            alert("Failed to add course. Please try again.");
        }
    };

    return (<>




        <div style={{ display: "flex", justifyContent: "center", zIndex: 1, marginTop: 0 }}>

            <Typography fontSize={22} style={{
                marginTop: 30
            }}>Add courses </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant={"outlined"} style={{
                marginTop: 5,
                marginBottom: 10, width: 300, padding: 20, borderRadius: 10
            }}>
                <TextField
                    fullWidth
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    label={"Title"}
                    variant={"outlined"}>

                </TextField>
                <br /><br />
                <TextField
                    fullWidth
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    label={"Description"}
                    variant={"outlined"}>


                </TextField>
                <br /><br />
                <TextField
                    fullWidth
                    onChange={(e) => {
                        setImageLink(e.target.value)
                    }}
                    label={"Image Link"}
                    variant={"outlined"}>

                </TextField>
                <br /><br />
                <TextField
                    fullWidth
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    label={"Price"}
                    variant={"outlined"}>

                </TextField>
                <br /><br />

                <Button
                    size="large"
                    variant="outlined"
                    onClick={handleAddCourse}
                >
                Add Course</Button>
            </Card>

        </div>

    </>
    )
}
export default AddCourse