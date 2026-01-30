export type UniversalUser = {
	id: string;
	username: string;
	avatarUrl: string;
	online: boolean;
	createdAt: string;
	lastLogin: string | null;
};

export type ProfileUser = UniversalUser & {
	customCss: string | null;
	biography: string | null;
};

export type LoggedUser = {
	id: string;
	email: string;
	token: string;
} & UniversalUser;
