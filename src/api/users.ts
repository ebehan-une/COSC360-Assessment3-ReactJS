import { api } from "./http";
import type { LoginCredentials, RegisterCredentials, User } from "../types";

/** User API Wrapper. */
export const UsersAPI = {

    // Initialize CSRF Protection.
    csrf: () =>
        api<void>( "/sanctum/csrf-cookie", { method: "GET" } ),

    // Login to Laravel Server.
    login: ( credentials: LoginCredentials ) =>
        api< { token: string; user: User } >( "/api/login", {
            method: "POST",
            body: JSON.stringify(credentials)
        }),

    // Register on Laravel Server.
    register: ( credentials: RegisterCredentials ) =>
        api< { token: string; user: User } >( "/api/register", {
            method: "POST",
            body: JSON.stringify(credentials)
        }),

    // Logout of Laravel Server.
    logout: ( token?: string | null ) =>
        api< { message: string } >( "/api/logout", { method: "POST" }, token ),

    // Authenticated Profile Session.
    user: ( token?: string | null ) =>
        api< User >( "/api/user", { method: "GET" }, token ),

};