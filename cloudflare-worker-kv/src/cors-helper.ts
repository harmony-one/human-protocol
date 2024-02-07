export const handleCors = (options = {}) => (request: any) => {
	const {
		origin = '*',
		methods = 'GET, POST, PATCH, DELETE',
		headers = 'referer, origin, content-type',
		maxAge = null,
		allowCredentials = false,
	} = options as any

	if (
		request.headers.get('Origin') !== null &&
		request.headers.get('Access-Control-Request-Method') !== null
	) {
		const corsHeaders = {
			'Access-Control-Allow-Origin': origin,
			'Access-Control-Allow-Methods': methods,
			'Access-Control-Allow-Headers': headers,
		} as any

		if (allowCredentials) {
			corsHeaders['Access-Control-Allow-Credentials'] = 'true'
		}

		if (maxAge) {
			corsHeaders['Access-Control-Max-Age'] = maxAge
		}

		// Handle CORS pre-flight request.
		return new Response(null, {
			status: 204,
			headers: corsHeaders
		})
	}

	// Handle standard OPTIONS request.
	return new Response(null, {
		headers: {
			'Allow': `${methods}, HEAD, OPTIONS`,
		}
	})
}

export const wrapCorsHeader = (response: any, options = {}) => {
	const {
		origin = '*',
	} = options as any

	response.headers.set('Access-Control-Allow-Origin', origin)

	return response
}