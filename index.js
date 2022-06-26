document.addEventListener("DOMContentLoaded", async () => {
	try {
		const switchButton = document.querySelectorAll(".switch-container")[0];
		const emojisDiv = document.querySelectorAll("#emojis")[0];
		const turnOn = () => {
			chrome.storage.sync.get((obj) => {
				blockRequests(obj.privateGramActive);
			});
		};

		const changeEmojis = (blocking = true) => {
			if (blocking) {
				switchButton.classList.add("active");
				emojisDiv.innerHTML = "✅ 🥷  &nbsp;";
			} else {
				switchButton.classList.remove("active");
				emojisDiv.innerHTML = "❌ 👀 &nbsp;";
			}
		};
		const init = () => {
			chrome.storage.sync.get((obj) => {
				if (
					!Object.keys(obj).length ||
					(Object.keys(obj) && obj.privateGramActive === undefined)
				) {
					chrome.storage.sync.set({ ["privateGramActive"]: true });
					console.log(document.querySelectorAll(".switch-container")[0]);
					document
						.querySelectorAll(".switch-container")[0]
						.classList.add("active");
					console.log("INIT...");
				} else {
					chrome.storage.sync.get((obj) => {
						if (obj.privateGramActive) {
							changeEmojis(true);
						} else {
							changeEmojis(false);
						}
					});
				}
			});
		};

		const handleClick = () => {
			chrome.storage.sync.get((obj) => {
				if (obj.privateGramActive) {
					chrome.storage.sync.set({ ["privateGramActive"]: false });
				} else {
					chrome.storage.sync.set({ ["privateGramActive"]: true });
				}

				switchButton.classList.toggle("active");

				chrome.storage.sync.get((obj) => {
					console.log("LALLALA", obj.privateGramActive);
					changeEmojis(obj.privateGramActive);
					blockRequests(obj.privateGramActive);
				});
			});
		};

		function shouldCancel() {
			return { cancel: true };
		}

		const blockRequests = (blocking = true) => {
			if (chrome.webRequest.onBeforeRequest.hasListener(shouldCancel)) {
				chrome.webRequest.onBeforeRequest.removeListener(shouldCancel);
			}

			console.log("blocking", blocking);
			chrome.webRequest.onBeforeRequest.addListener(
				shouldCancel,
				{
					urls: blocking
						? [
								"https://i.instagram.com/api/v1/stories/reel/seen",
								"https://i.instagram.com/api/v1/direct_v2/threads/*/items/*/seen/",
						  ]
						: [""],
				},
				["blocking"]
			);
		};
		init();
		turnOn();
		switchButton.addEventListener("click", handleClick);
		// chrome.storage.sync.clear();
	} catch (e) {
		console.error(e);
	}
});
