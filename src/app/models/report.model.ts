export interface Report{
    title: string,
    description: string,
    priority: number,
    image: string,
    location: {
        latitude: number,
        longitude: number
    }
}