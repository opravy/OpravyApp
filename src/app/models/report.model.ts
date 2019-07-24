import { Label } from "./label.model";

export interface Report{
    title: string,
    description: string,
    priority: number,
    labels: Array<Label>,
    image: string,
    location: {
        latitude: number,
        longitude: number
    },
    status: string
}