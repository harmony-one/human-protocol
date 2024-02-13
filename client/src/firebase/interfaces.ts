export interface ILocation {
    address: string;
    latitude: number | null;
    longitude: number | null;
}

export interface IMessage {
    id: string;
    username: string;
    text: string;
    timestamp: string;
    address: string;
    latitude: string;
    longitude: string;
    images: string[];
}