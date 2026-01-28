export type User = UniversalUser;

export type UniversalUser = {
	id: string;
	username: string;
	avatarUrl: string;
	online: boolean;
	createdAt: string;
	lastLogin: string | null;
};

export type ProfileUser = User & {
	customCss: string | null;
};

export type LoggedUser = {
	id: string;
	email: string;
	token: string;
} & UniversalUser;
