const allToggles = document.querySelectorAll(".switch-container");

allToggles.forEach((x) => {
	const id = x.id;
	document.getElementById(id).addEventListener("click", function () {
		handleClick(id);
	});
});

function handleClick(id) {
	document.getElementById(id).classList.toggle("active");
}
