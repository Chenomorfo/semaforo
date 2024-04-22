<article>
    <img src="imgs/meteoro.png" alt="">
</article>

<style>
	article {
		position: absolute;
		height: 20px;
		width: 30px;
		top: var(--top, 0);
		left: var(--left, 0);
		animation: driving 15s infinite;
	}
    img{
        height: 100%;
        width: 100%;
    }
	@keyframes driving {
		0% {
			transform: translateX(0px);
		}
		100% {
			transform: translateX(1000px);
		}
	}
</style>
