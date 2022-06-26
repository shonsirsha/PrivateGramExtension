document.addEventListener("DOMContentLoaded", async () => {
	try {
		const BLOCKED_URLS = [
			"https://i.instagram.com/api/v1/stories/reel/seen",
			"https://i.instagram.com/api/v1/direct_v2/threads/*/items/*/seen/",
		];
		const getFromStorage = () => {
			return { cancel: true };
		};
		chrome.webRequest.onBeforeRequest.addListener(
			function () {
				return getFromStorage();
			},
			{
				urls: BLOCKED_URLS,
			},
			["blocking"]
		);
	} catch (e) {
		console.error(e);
	}
});
