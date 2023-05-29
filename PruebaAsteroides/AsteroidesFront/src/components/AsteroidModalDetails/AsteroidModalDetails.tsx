import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { IAsteroidModalDetails } from "../../interfaces/components/IAsteroidModalDetails";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AsteroidModalDetails = ({ open, setOpen, data }: IAsteroidModalDetails) => {

    const { name, id, absolute_magnitude_h, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data } = data;

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="text-black overflow-y-auto"
            >
                <Box sx={style}>
                    <Typography variant="h5" component="h2">
                        Name: {name}
                    </Typography>
                    <Typography variant="h4" component="h2">
                        Id: {id}
                    </Typography>
                    <Typography variant="h4" component="h2">
                        Absolute magnitud: {absolute_magnitude_h}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Is {is_potentially_hazardous_asteroid ? '' : 'not'} potentially hazarouds asteroid.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Estimated max diameter:{estimated_diameter?.kilometers?.estimated_diameter_max}km
                        Estimated min diameter:{estimated_diameter?.kilometers?.estimated_diameter_min}km
                    </Typography>

                    {close_approach_data && close_approach_data.length > 0 && close_approach_data.map((date, i) => {
                        return (
                            <div key={i}>
                            <Typography variant="body2" color="text.secondary" >
                                Date: {date?.close_approach_date_full}.
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                Orbiting body: {date?.orbiting_body}.
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                Relative velocity: {date?.relative_velocity.kilometers_per_hour}Km/h.
                            </Typography>
                            </div>
                        )
                    }
                    )}
                </Box>
            </Modal>
        </div>
    )

}

export default AsteroidModalDetails;