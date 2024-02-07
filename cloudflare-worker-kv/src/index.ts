import {
	json,
	error,
	withContent,
	withParams,
	Router,
} from 'itty-router'
import { handleCors, wrapCorsHeader } from './cors-helper';

export interface Env {
	['hp-dev-message']: KVNamespace;
}

// create a new Router
const router = Router()

router
	// add some middleware upstream on all routes
	.options('*', handleCors({ methods: 'GET', maxAge: 86400 }))

	.all('*', withParams)
	.all('*', withContent)

	.get('/all-keys', async (req, env) => {
		const list = await env['hp-dev-message'].list();

		return list.keys.map((l: any) => l.name);
	})

	.get('/actions', async (request, env) => {
		const { limit = 1000, topic } = request.query;

		const list = await env['hp-dev-message'].list({
			prefix: 'actions:time',
			limit: 1000
		});

		let res: any = [];

		for (const key of list.keys) {
			const value = await env['hp-dev-message'].get(key.name);
			try {
				const actionsArr = JSON.parse(value);

				if (Array.isArray(actionsArr)) {
					const actionsPayload = await Promise.all(
						actionsArr.map(async (action: string) => {
							const value = await env['hp-dev-message'].get(`actions:id:${action}`)

							return {
								...JSON.parse(value),
								action: action,
								timestamp: key.name.split(':')[2]
							}
						}))

					res = res.concat(actionsPayload)
				}

			} catch (e) {
				// res.push(value);
			}
		}

		if (topic) {
			res = res.filter((r: any) => r.topic === topic);
		}

		return wrapCorsHeader(json(res));
	})

	.post('/interests', async ({ content }, env) => {
		const value = await env['hp-dev-message'].get(`interests:${content.id}`);

		await env['hp-dev-message'].put(
			`interests:${content.id}`,
			String(Number(value || 0) + 1)
		);

		return wrapCorsHeader(json({ success: true }, { status: 200 }));
	})

	.get(
		'/interests/:id',
		async ({ id }, env) => {
			const value = await env['hp-dev-message'].get(`interests:${id}`);

			if (value === null) {
				return new Response("Value not found", { status: 404 });
			}

			return new Response(value);
		}
	)

	.post('/users', async ({ content }, env) => {
		console.log(content);

		const value = await env['hp-dev-message'].put(
			`users:${content.id}`,
			JSON.stringify(content.topics)
		);

		if (Array.isArray(content.topics)) {
			await Promise.all(content.topics.map(async (topic: string) => {
				const value = await env['hp-dev-message'].get(`interests:${topic}`);

				await env['hp-dev-message'].put(
					`interests:${topic}`,
					String(Number(value || 0) + 1)
				);
			}))
		}

		return wrapCorsHeader(json({ success: true }, { status: 201 }));
	})

	.get(
		'/users/:id',
		async ({ id }, env) => {
			const value = await env['hp-dev-message'].get(`users:${id}`);

			if (value === null) {
				return new Response("Value not found", { status: 404 });
			}

			return wrapCorsHeader(json(JSON.parse(value)));
			// return new Response(value);
		}
	)

	.post('/actions', async ({ content }, env) => {
		const { id, user, payload, topic } = content;

		const timestamp = Math.floor(Date.now() / 1000);

		await env['hp-dev-message'].put(
			`actions:time:${timestamp}`,
			JSON.stringify([content.id])
		);

		await env['hp-dev-message'].put(
			`actions:id:${content.id}`,
			JSON.stringify({
				user,
				payload,
				topic
			})
		);

		return wrapCorsHeader(json({ success: true }, { status: 201 }));
	})

	.get(
		'/actions/:id',
		async ({ id }, env) => {
			const value = await env['hp-dev-message'].get(`actions:id:${id}`);

			if (value === null) {
				return new Response("Value not found", { status: 404 });
			}

			return new Response(value);
		}
	)

	// 404 for everything else
	.all('*', () => error(404))

// Example: Cloudflare Worker module syntax
export default {
	fetch: async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> =>
		router
			.handle(request, env, ctx)
			// .then(json)     // send as JSON
			.catch(error),  // catch errors
}