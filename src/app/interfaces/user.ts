export interface UserProperty {
    id: number;
    username: string;
}

export interface DefaultUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    roleName: string;
    deactivatedUntil: string;
}

export class User implements DefaultUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    roleName: string;
    deactivatedUntil: string;

    constructor(user: any) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.roleName = user.role_name;
        this.deactivatedUntil = user.deactivated_until ? user.deactivated_until : null;
    }

    public getUserProperty(): UserProperty {
        return { id: this.id, username: this.username };
    }
}
