<!DOCTYPE html>
<html lang="pt-br">

<head>
	<title>Toast - Demo</title>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style.css">
</head>

<body>
	<h1>Toast</h1>
	<button onclick="toast1()">Toast 1</button>
	<button onclick="hideToast1()">Hide Toast 1</button>
	<button onclick="toast2()">Toast 2</button>
	<br>
	<br>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis vitae voluptas alias impedit eum ab accusamus necessitatibus distinctio, non cum voluptate, obcaecati iure fugit quam? Veniam maiores beatae alias illum?
</body>

<script type="module">
	import Toast from './Toast.js';

	window.toast1 = toast1;
	window.toast2 = toast2;
	window.hideToast1 = hideToast1;

	let toast;

	function toast1() {
		toast = Toast({
			icon: '<span style="font-size: 1.2em; color: cyan;">H</span>',
			message: `<span>${new Date().toUTCString()}</span> <span>Asdf <b style="color: yellow;">QWER</b>`,//.toUpperCase(),
			position: 'top center',
			//gap: 12,
			//inset: 12,
			time: 5000,
			hideButton: true,
		});
	}

	function toast2() {
		Toast({
			icon: '<span style="font-size: 1.2em;">H</span>',
			message: `${new Date().toUTCString()} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe incidunt pariatur distinctio nobis rerum doloremque, fugit possimus assumenda accusantium, eos hic non deserunt reprehenderit porro aliquid libero quae placeat voluptate!`,
			position: 'bottom center',
			//gap: 12,
			//inset: 12,
			time: 5000,
		});
	}

	function hideToast1() {
		toast.hide();
	}
</script>

<style>
	body {
		margin: 0;
		padding: 32px;
		font-family: sans-serif;
		font-size: 13px;
	}

	button {
		padding: 6px 12px;
	}
</style>

</html>
