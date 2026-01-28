export type User = UniversalUser;

export type UniversalUser = {
	id: string;
	username: string;
	avatar_url: string;
	online: boolean;
	created_at: string;
	last_login: string | null;
};

export type ProfileUser = User & {
	custom_css: string | null;
};

export type LoggedUser = {
	id: string;
	email: string;
	token: string;
} & UniversalUser;
