/*
	Criado por Janderson Costa em 17/03/2024.
*/

const defaultOptions = {
	icon: null, // HTMLElement | string,
	message: null, // string (text | html),
	position: 'bottom center', // string ('top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right'),
	time: 5, // number (seconds),
};

export default function Toast(options = {}) {
	options = { ...defaultOptions, ...options };

	create();

	function create() {
		// Container
		let $toasts = document.querySelector('.toasts');

		if (!$toasts) {
			$toasts = document.createElement('div');
			$toasts.className = 'toasts';
			document.body.appendChild($toasts);
		}

		const $toast = document.createElement('div');

		$toast.classList.add('toast');
		$toast.innerHTML = /*html*/`
			<div class="toast-icon"></div>
			<div class="toast-body">
				<div class="toast-content">
					${options.message}
				</div>
			</div>
			<div class="toast-button">
				<button type="button" class="toast-button-icon" onclick="this.parentElement.parentElement.remove()">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
					</svg>
				</button>
			</div>
		`;

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
		if (options.position.match('left')) {
			$toasts.classList.add('left');
		} else if (options.position.match('right')) {
			$toasts.classList.add('right');
		} else  {
			$toasts.classList.add('center');
		}

		// Posição vertical
		if (options.position.match('top')) {
			$toasts.classList.add('top');

			// Adiciona em cima do anterior
			$toasts.prepend($toast);
			$toast.classList.add('show', 'top');
		} else {
			$toasts.classList.add('bottom');

			// Adiciona em baixo do anterior
			$toasts.appendChild($toast);
			$toast.classList.add('show', 'bottom');
		}

		// Remove ao término do tempo de exibição
		setTimeout(() => {
			// Oculta
			$toast.className = $toast.className.replace('show', 'hide');

			// Remove
			setTimeout(() => $toast.remove(), 500);
		}, options.time * 1000);
	}
}

(() => {
	// Style
	// let link = document.querySelector('link#toast');

	// if (link) return;

	// link = document.createElement('link');
	// link.id = 'toast';
	// link.rel = 'stylesheet';
	// link.type = 'text/css';
	// link.href = './style.css?v=' + new Date().getTime();
	// document.querySelector('head').appendChild(link);
})();
