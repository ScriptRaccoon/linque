<div class="bar"></div>

<style>
	.bar {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		height: 2px;
		background-color: yellow;
		animation: grow 2s linear forwards;
		opacity: 0.75;
	}

	@keyframes grow {
		0% {
			width: 0rem;
		}

		20% {
			width: 50%;
		}

		40% {
			width: 75%;
		}

		60% {
			width: 87.5%;
		}

		80% {
			width: 95%;
		}

		100% {
			width: 99%;
		}
	}
</style>
