
// User data
export interface User {
    Name: string;
    Id: number;
    ProviderEmail: string;
}

// Appointment data
export interface Appointment {
    Description: string;
    Start: Date;
    End: Date;
    Notes: string[];
    Party: number[];
    Id: number;
    ProviderEmail: string;
}