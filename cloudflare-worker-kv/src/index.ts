import {
	json,
	error,
	withContent,
	withParams,
	Router,
} from 'itty-router'

export interface Env {
	['hp-dev-message']: KVNamespace;
}

// create a new Router
const router = Router()

router
	// add some middleware upstream on all routes
	.all('*', withParams)
	.all('*', withContent)

	.get('/messages-keys', async (req, env) => {
		const list = await env['hp-dev-message'].list();

		return list.keys.map((l: any) => l.name);
	})

	.get('/messages', async (req, env) => {
		const list = await env['hp-dev-message'].list();

		const res: any = [];

		for (const key of list.keys) {
			const value = await env['hp-dev-message'].get(key.name);

			try {
				res.push(JSON.parse(value));
			} catch (e) {
				res.push(value);
			}
		}

		return res;
	})

	.post('/messages', async ({ content }, env) => {
		console.log(content);

		const value = await env['hp-dev-message'].put(content.id, JSON.stringify(content));

		return 'true'
	})

	.get(
		'/messages/:id',
		async ({ id }, env) => {
			const value = await env['hp-dev-message'].get(id);

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
			.then(json)     // send as JSON
			.catch(error),  // catch errors
}