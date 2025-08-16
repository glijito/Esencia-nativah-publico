export async function getAnimationApi(){
    try{
        await customElements.whenDefined('dotlottie-wc');
        const player = document.getElementById('player-lottie');

        const ensureAPI = () =>
            new Promise(resolve => {
                if (player.dotLottie) return resolve(player.dotLottie);

                const check = setInterval(() => {
                    if (player.dotLottie) { clearInterval(check); resolve(player.dotLottie); }
                }, 20);
            });

        const dot = await ensureAPI();
        return dot
    }catch(e){
        console.log("Error loading lottie animation", e)
        return null
    }
}