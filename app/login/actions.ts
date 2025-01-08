'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Provider } from '@supabase/supabase-js';
import { getURL } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';

export async function emailLogin(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect('/login?message=Could not authenticate user');
	}

	revalidatePath('/', 'layout');
	redirect('/');
}

export async function signup(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		redirect('/login?message=Error signing up');
	}

	revalidatePath('/', 'layout');
	redirect('/login');
}

export async function oAuthSignIn(provider: Provider) {
	if (!provider) {
		redirect('/login?message=No provider selected');
	}

	const supabase = await createClient();
	const redirectUrl = getURL('/auth/callback');
	// const { data, error } = await supabase.auth.signInWithOAuth({
	// 	provider,
	// 	options: {
	// 		redirectTo: redirectUrl,
	// 	},
	// });
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: redirectUrl,
		},
	});

	if (error) {
		redirect('/login?message=Could not authenticate user');
	}

	return redirect(data.url);
}
