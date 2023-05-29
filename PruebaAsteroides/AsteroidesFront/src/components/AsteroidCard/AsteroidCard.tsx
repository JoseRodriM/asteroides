import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { IAsteroidCard } from '../../interfaces/components/IAsteroidCard';
import { isEmpty } from 'lodash';
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';

const AsteroidCard = ({ data, user, setUser, setIsOpen, setSelectedAsteroidId }: IAsteroidCard) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const { name, id, is_potentially_hazardous_asteroid, close_approach_data, absolute_magnitude_h } = data
    const { favoriteAsteroids, id: userId } = user;
    const { saveFavoriteAsteroid } = useUser()

    const addToFavorite = async () => {
        if (isEmpty(user)) return window.alert('You must log in to save to favorites.')
        const userData = { id: userId, favoriteAsteroidId: id }
        const updatedUser = await saveFavoriteAsteroid(userData)
        updatedUser && setUser(updatedUser)
    }

    useEffect(() => {
        setIsFavorite(favoriteAsteroids?.includes(id))
    }, [user])

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Name: {name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    Id: {id}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    Absolute magnitud: {absolute_magnitude_h}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Is {is_potentially_hazardous_asteroid ? '' : 'not'} potentially hazarouds asteroid.
                </Typography>
                {close_approach_data && close_approach_data.length > 0 && close_approach_data.map((date, i) => {
                    return (
                        <Typography variant="body2" color="text.secondary" key={i}>
                            Date: {date.close_approach_date_full}.
                        </Typography>
                    )
                }
                )}
            </CardContent>
            <CardActions>
                <Tooltip title={`${isFavorite ? 'Added as favorite' : 'Add to favorites'}`} arrow>
                    <IconButton aria-label={"add to favorites"} onClick={() => addToFavorite()}>
                        <FavoriteIcon className={`${isFavorite && 'text-red-600'}`} />
                    </IconButton>
                </Tooltip>
                <Button size="small" onClick={() => {
                    setIsOpen(true)
                    setSelectedAsteroidId(id)
                }}>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default AsteroidCard;