import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DreamJournalEntry {
    content: string;
    date: Time;
    mood?: string;
    tags: Array<string>;
}
export interface Settings {
    localOnly: boolean;
    ethicsAccepted: boolean;
}
export type Time = bigint;
export interface BioInput {
    activityLevel: bigint;
    sleepQuality: bigint;
    heartRate: bigint;
    timestamp: Time;
    geomagneticField?: bigint;
    moonPhase?: bigint;
}
export interface Ritual {
    title: string;
    completed: boolean;
    description: string;
    schedule: Array<bigint>;
    timeOfDay?: bigint;
}
export interface Alert {
    level: AlertLevel;
    message: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export enum AlertLevel {
    red = "red",
    blue = "blue",
    yellow = "yellow"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBioInput(input: BioInput): Promise<AlertLevel>;
    addDreamEntry(entry: DreamJournalEntry): Promise<void>;
    addRitual(ritual: Ritual): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearUserData(): Promise<void>;
    getAlerts(): Promise<Array<Alert>>;
    getAllUsers(): Promise<Array<Principal>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDreams(): Promise<Array<DreamJournalEntry>>;
    getRituals(): Promise<Array<Ritual>>;
    getSettings(): Promise<Settings | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateSettings(settings: Settings): Promise<void>;
}
