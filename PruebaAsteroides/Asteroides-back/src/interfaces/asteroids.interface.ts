export interface IAsteroid {
    links: {
        self: string;
    }
    id: string;
    neo_reference_id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: {
        kilometers: IEstimatedDiameter;
        meters: IEstimatedDiameter;
        miles: IEstimatedDiameter;
        feet: IEstimatedDiameter
    }
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: CloseApproachDatum[];
    is_sentry_object: boolean;
}

interface IEstimatedDiameter {
    estimated_diameter_min: number;
    estimated_diameter_max: number
}

interface CloseApproachDatum {
    close_approach_date: Date |string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: RelativeVelocity;
    miss_distance: MissDistance;
    orbiting_body: string;
}

interface RelativeVelocity {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
}

interface MissDistance {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
}

export interface IResAsteroid {
    links:              WelcomeLinks;
    element_count:      number;
    near_earth_objects: { [key: string]: IAsteroid[] };
}

interface WelcomeLinks {
    next:     string;
    previous: string;
    self:     string;
}