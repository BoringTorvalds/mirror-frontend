export function parseNavigationRequest(route) {
	// String process route name
	route = route.trim().split(" ").join("");
	const LIST_OF_ROUTES = ["login", "signup", "home"];
	if (route in LIST_OF_ROUTES) {
		return '/' + route;
	} 
	return '/home';
}
