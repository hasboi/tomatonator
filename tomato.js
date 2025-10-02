let isThrowing = false;
let isHidden = false;
let tomatoSize = 50;
let randomize = false;
let inExtra = false;

const throwToggle = document.getElementById("tomatoToggle");
const targetUpload = document.getElementById("target");
const targetLabel = document.getElementById("targetLabel");
const imageContainer = document.getElementById("targetImg");
const container = document.getElementById("container");
const removeTarget = document.getElementById("removeTarget");
const useJohn = document.getElementById("useJohn");
const autoWipe = document.getElementById("autoWipe");
const allButtons = document.querySelectorAll(
	"#options button, #options .btnImitation"
);
const hideBtn = document.getElementById("hideBtns");
const options = document.getElementById("options");
const slider = document.getElementById("tomatoSize");
const randomizer = document.getElementById("randomizeTomato");
const sliderContainer = document.getElementById("sliderContainer");
const extraBtn = document.getElementById("extraToggle");
const tomatoScreen = document.getElementById("tomato");
const extraScreen = document.getElementById("extras");
const interactiveSelector = [
	"button",
	"input",
	"label",
	"select",
	"textarea",
	"#options",
].join(",");

function throwTomato(posX, posY) {
	const tomato = document.createElement("img");
	tomato.src = "tomaot.gif?cache=" + Date.now();
	tomato.className = "tomato";
	tomato.style.left = posX + "px";
	tomato.style.top = posY + "px";
	const finalSize = randomize ? Math.random() : tomatoSize / 100;
	tomato.style.width = 2000 * finalSize + "px";
	if (inExtra) {
		extraScreen.appendChild(tomato);
	} else {
		tomatoScreen.appendChild(tomato);
	}

	setTimeout(() => {
		const splat = new Audio("splat.mp3");
		splat.play();
	}, 3400);

	setTimeout(() => {
		if (autoWipe.checked) {
			setTimeout(() => {
				tomato.classList.add("dissolve");
				tomato.addEventListener("animationend", () => {
					tomato.remove();
				});
			}, 3000);
		}
	}, 6090);
}

document.addEventListener("DOMContentLoaded", () => {
	extraBtn.addEventListener("click", () => {
		inExtra = !inExtra;
		if (inExtra) {
			extraBtn.innerText = "back";
			tomatoScreen.style.display = "none";
			extraScreen.style.display = "flex";
			useJohn.classList.add("disabled");
			targetLabel.classList.add("disabled");
		} else {
			extraBtn.innerText = "extras";
			tomatoScreen.style.display = "flex";
			extraScreen.style.display = "none";
			useJohn.classList.remove("disabled");
			targetLabel.classList.remove("disabled");
		}
	});

	randomizer.addEventListener("change", () => {
		randomize = !randomize;
		if (randomizer.checked) {
			sliderContainer.classList.add("disabled2");
		} else {
			sliderContainer.classList.remove("disabled2");
		}
	});

	slider.addEventListener("change", () => {
		tomatoSize = slider.value;
	});

	allButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
		});
	});

	throwToggle.addEventListener("click", (e) => {
		e.stopPropagation();
		isThrowing = !isThrowing;
		document.body.style.cursor = isThrowing ? "crosshair" : "default";
		throwToggle.innerText = isThrowing ? "cease fire" : "trow tomato >:)";
	});

	document.addEventListener("click", (e) => {
		if (!isThrowing) return;

		if (e.target.closest(interactiveSelector)) return;

		throwTomato(e.pageX, e.pageY);
	});

	autoWipe.addEventListener("change", () => {
		const tomatoes = document.querySelectorAll(".tomato");

		if (autoWipe.checked) {
			tomatoes.forEach((tomato) => {
				tomato.classList.add("dissolve");
				tomato.addEventListener("animationend", () => {
					tomato.remove();
				});
			});
		}
	});

	targetUpload.addEventListener("change", () => {
		const file = targetUpload.files[0];
		if (!file) {
			targetLabel.innerText = "upload pictuer";
			imageContainer.style.display = "none";
			return;
		}

		if (file.type.startsWith("image/")) {
			imageContainer.style.display = "block";
			container.classList.add("has-image");
			imageContainer.src = URL.createObjectURL(file);
			targetLabel.classList.add("disabled");
			removeTarget.classList.remove("disabled");
			removeTarget.innerText = "remove pocture";
			useJohn.classList.add("disabled");
			URL.revokeObjectURL(file);
		} else {
			imageContainer.style.display = "block";
			targetLabel.classList.add("disabled");
			console.log("it is not an image");
			return;
		}
	});

	useJohn.addEventListener("click", () => {
		container.classList.add("has-image");

		imageContainer.style.display = "block";

		imageContainer.src = "john.jpeg";
		removeTarget.innerText = "put ungrateful john back to jail";

		useJohn.classList.add("disabled");
		targetLabel.classList.add("disabled");
		removeTarget.classList.remove("disabled");
	});

	removeTarget.addEventListener("click", () => {
		imageContainer.style.display = "none";
		container.classList.remove("has-image");

		imageContainer.src = "";

		targetLabel.classList.remove("disabled");
		useJohn.classList.remove("disabled");
		removeTarget.classList.add("disabled");
	});

	hideBtn.addEventListener("click", () => {
		isHidden = !isHidden;

		if (isHidden) {
			allButtons.forEach((button) => {
				button.classList.add("hidden");
			});
			hideBtn.classList.remove("hidden");
			container.classList.add("hidden-buttons");
			hideBtn.innerText = "show buttons";
		} else {
			allButtons.forEach((button) => {
				button.classList.remove("hidden");
				container.classList.remove("hidden-buttons");
			});
			hideBtn.innerText = "hide buttons";
		}
	});
});
