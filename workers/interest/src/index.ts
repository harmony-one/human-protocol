/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	HCOUNTRY: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const pathSegments = url.pathname.split('/');

		if (request.method === 'OPTIONS') {
			return handleOptions(request);
		}

		if (pathSegments[1] !== 'interest' || pathSegments.length < 3) {
			return new Response("URL must be in the format /interest/<key>", { status: 400 });
		}

		const key = `interest:${pathSegments[2]}`;

		if (request.method === 'POST') {
			try {
				const currentValueStr: string | null = await env.HCOUNTRY.get(key);
				if (currentValueStr === null) {
					return new Response("Key does not exist", { status: 404 });
				}

				const currentValue: number = parseInt(currentValueStr, 10);
				if (isNaN(currentValue)) {
					return new Response("Current value is not a number", { status: 400 });
				}

				const newValue = currentValue + 1;
				await env.HCOUNTRY.put(key, newValue.toString());

				return new Response(JSON.stringify(newValue), {
					status: 200,
					headers: { 'Content-Type': 'application/json', ...corsHeaders },
				});
			} catch (err) {
				console.error(`KV returned error for key ${key}: ${err}`);
				return new Response("Server error", { status: 500 });
			}
		} else {
			try {
				const value: string | null = await env.HCOUNTRY.get(key);
				if (value === null) {
					return new Response("Value not found for key: " + key, { status: 404 });
				}
				return new Response(value, {
					status: 200,
					headers: { 'Content-Type': 'application/json', ...corsHeaders },
				});
			} catch (err) {
				console.error(`KV returned error for key ${key}: ${err}`);
				return new Response("Server error", { status: 500 });
			}
		}
	},
};

const corsHeaders: HeadersInit = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

function handleOptions(request: Request): Response {
	if (
		request.headers.get('Origin') !== null &&
		request.headers.get('Access-Control-Request-Method') !== null &&
		request.headers.get('Access-Control-Request-Headers') !== null
	) {
		return new Response(null, {
			headers: corsHeaders,
		});
	} else {
		return new Response(null, {
			headers: {
				Allow: 'GET, POST, OPTIONS',
			},
		});
	}
}
