/*
	Criado por Janderson Costa em 17/03/2024.
*/

const defaultOptions = {
	icon: null, // HTMLElement | string
	message: null, // string (text | html)
	position: 'bottom center', // string ('top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right')
	gap: 12, // number (pixels)
	inset: 12, // number (pixels)
	time: 5, // number (seconds)
	hideButton: true, // Exibe o botão X
};

// (() => {
// 	// Style
// 	let link = document.querySelector('link#toast');

// 	if (link) return;

// 	link = document.createElement('link');
// 	link.id = 'toast';
// 	link.rel = 'stylesheet';
// 	link.type = 'text/css';
// 	link.href = 'style.css?v=' + new Date().getTime();

// 	document.querySelector('head').appendChild(link);
// })();

// Container
let $toasts = document.querySelector('.toasts');

if (!$toasts) {
	$toasts = document.createElement('div');
	$toasts.className = 'toasts';
	$toasts.addEventListener('mouseover', () => $toasts.classList.add('scrollable', 'mouseover'));
	$toasts.addEventListener('mouseout', () => $toasts.classList.remove('scrollable', 'mouseover'));

	document.body.appendChild($toasts);
}

export default function Toast(options = {}) {
	options = { ...defaultOptions, ...options };

	let $toastWrapper;

	$toasts.style.inset = `${options.inset}px`;
	create();

	return {
		hide,
	};

	function create() {
		$toastWrapper = document.createElement('div');
		$toastWrapper.classList.add('toast-wrapper');
		$toastWrapper.innerHTML = /*html*/`
			<div class="toast">
				<div class="toast-icon"></div>
				<div class="toast-body">
					<div class="toast-content">
						${options.message}
					</div>
				</div>
				<div class="toast-button hidden">
					<button type="button" class="toast-button-icon">✖</button>
				</div>
			</div>
		`;

		const $toast = $toastWrapper.querySelector('.toast');

		$toastWrapper.prepend($toast);

		// Botão ocultar
		if (options.hideButton) {
			const $button = $toast.querySelector('.toast-button');

			$button.classList.remove('hidden');
			$button.addEventListener('click', hide);
		}

		// Ícone
		if (options.icon) {
			const $icon = $toast.querySelector('.toast-icon');

			if (options.icon instanceof HTMLElement)
				$icon.appendChild(options.icon);
			else
				$icon.innerHTML = options.icon;

			$toast.prepend($icon);
		}

		// Posição horizontal
		const positionX = 'center';

		if (options.position.match('left')) {
			positionX = 'left';
		} else if (options.position.match('right')) {
			positionX = 'right';
		}

		$toastWrapper.classList.add(positionX);

		// Posição vertical
		if (options.position.match('top')) {
			$toasts.querySelectorAll('.toast-wrapper.bottom').forEach(x => x.remove());
			$toastWrapper.classList.add('top');
			$toastWrapper.style.transform = 'scale(0.8) translateY(-12px)';

			// Adiciona em cima do anterior
			$toasts.prepend($toastWrapper);

			const height = $toastWrapper.offsetHeight;

			setTimeout(() => {
				$toastWrapper.style.transform = 'scale(1)';
				$toastWrapper.style.transform = 'translateY(0px)';
				$toastWrapper.style.opacity = 1;
			}, 0);

			// Move os outros para baixo
			const $items = $toasts.querySelectorAll('.toast-wrapper');

			$items.forEach(($toastWrapper, index) => {
				if (index == 0) return;

				const translateY = Number($toastWrapper.style.transform.replace(/\D/g, ''));

				$toastWrapper.style.transform = `translateY(calc(${translateY + height}px + ${options.gap}px))`;
			});
		}

		if (options.position.match('bottom')) {
			$toasts.querySelectorAll('.toast-wrapper.top').forEach(x => x.remove());
			$toastWrapper.classList.add('bottom');
			$toastWrapper.style.transform = 'scale(0.8) translateY(12px)';

			// Adiciona em baixo do anterior
			$toasts.appendChild($toastWrapper);

			const height = $toastWrapper.offsetHeight;

			setTimeout(() => {
				$toastWrapper.style.transform = 'scale(1)';
				$toastWrapper.style.transform = 'translateY(0px)';
				$toastWrapper.style.opacity = 1;
			}, 0);

			// Move os outros para cima
			const $items = $toasts.querySelectorAll('.toast-wrapper');

			$items.forEach(($toastWrapper, index) => {
				if (index == $items.length - 1) return;

				const translateY = Number($toastWrapper.style.transform.replace(/\D/g, ''));

				$toastWrapper.style.transform = `translateY(calc(-1 * (${translateY + height}px + ${options.gap}px)))`;
			});
		}

		// // Remove ao término do tempo de exibição
		// setInterval(() => {
		// 	if (!$toasts.classList.contains('mouseover')) {
		// 		// Oculta
		// 		$toast.className = $toast.className.replace('show', 'hide');

		// 		// Remove
		// 		setTimeout(() => $toast.remove(), 300);
		// 	}
		// }, options.time * 1000);
	}

	function hide() {
		$toastWrapper.style.transform = `scale(0.8) translateY(${$toastWrapper.style.transform})`;
		$toastWrapper.style.opacity = 0;

		const $items = Array.from($toasts.querySelectorAll('.toast-wrapper'));
		let translateY;
		let move = false;

		// $items.forEach(($tw, index) => {
		// 	if (options.position.match('top')) {
		// 		if ($tw == $toastWrapper) {
		// 			move = true;
		// 		} else if (move) {
		// 			translateY = translateY == undefined ? $toastWrapper.style.transform : $tw.nextSibling.style.transform;
		// 			translateY = Number(translateY.replace(/\D/g, ''));

		// 			$tw.style.transform = `translateY(${translateY}px)`;
		// 		}
		// 	}
		// });

		for (let i = $items.length - 1; i >= 0; i--) {
			const $tw = $items[i];

			if ($tw == $toastWrapper) {
				move = true;
				continue;
			}

			if (move) {
				const $prev = $items[i + 1];

				console.log($prev);

				if ($prev) {
					const translateY = Number($prev.style.transform.replace(/\D/g, ''));

					console.log($prev.style.transform);
	
					$tw.style.transform = `translateY(${translateY}px)`;
				}
			}
		}
	}
}
