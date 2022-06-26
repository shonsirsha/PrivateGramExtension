document.addEventListener("DOMContentLoaded", async () => {
	try {
		function shouldCancel() {
			return { cancel: true };
		}

		const blockRequests = () => {
			chrome.webRequest.onBeforeRequest.addListener(
				shouldCancel,
				{
					urls: [
						"https://i.instagram.com/api/v1/stories/reel/seen",
						"https://i.instagram.com/api/v1/direct_v2/threads/*/items/*/seen/",
					],
				},
				["blocking"]
			);
		};
		blockRequests();
	} catch (e) {
		console.error(e);
	}
});
