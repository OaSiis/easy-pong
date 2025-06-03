export class AuthService {
    static getToken(): string | null {
        return localStorage.getItem(`token`);
    }

    static isLoggedIn(): boolean {
        return !!this.getToken();
    }

    static logout(): void {
        localStorage.removeItem(`token`);
    }
}