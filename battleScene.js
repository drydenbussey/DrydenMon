const battleBackgroundImage = new Image()
battleBackgroundImage.src = './images/battleBackground.png'
const battleBackground = new Sprite({position:{
    x:0,
    y:0,
    },
    image:battleBackgroundImage
})


let bug 
let emby
let renderedSprites
let battleAnimationId
let queue


function initBattle() {
    document.querySelector('#userInterface').style.display ='block'
    document.querySelector('#dialogueBox').style.display ="none"
    document.querySelector('#enemyHealthBar').style.width ="100%"
    document.querySelector('#playerHealthBar').style.width ="100%"
    document.querySelector('#attacksBox').replaceChildren()




    bug = new Monster (monsters.Bug)
    emby = new Monster (monsters.Emby)
    renderedSprites = [bug,emby]
    queue = []

    emby.attacks.forEach((attack) =>{
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })

    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            emby.attack({
                attack: selectedAttack,
                recipient: bug,
                renderedSprites
            })
    
            if(bug.health <= 0) {
                queue.push(() => {
                    bug.faint()
                })

                queue.push(() =>{
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = "none"
                            gsap.to('#overlappingDiv',{
                                opacity: 0
                            })
                            battle.initiated = false
                            audio.Map.play()
                        }
                    })
                })
    
            }
            
    
            queue.push(()=>{
                bug.attack({
                    attack: attacks.BruteForce,
                    recipient: emby,
                    renderedSprites
            })
    
            if(emby.health <= 0) {
                queue.push(() => {
                    emby.faint()
                })
                queue.push(() =>{
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv',{
                                opacity: 0
                            })
                            battle.initiated = false
                            audio.Map.play()
                        }
                    })
                })
                
    
            }
            
            button.addEventListener('mouseenter', (e) => {
                const selectedAttack = attacks[e.currentTarget.innerHTML]
                document.querySelector('#attackType').innerHTML = selectedAttack.type
                document.querySelector('#attackType').style.color = selectedAttack.color
                
            })
        })
            
    })
})

}

function animateBattle(){
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    

    renderedSprites.forEach((sprite) =>{
        sprite.draw()
    })
}
animate()
// initBattle()
// animateBattle()








document.querySelector('#dialogueBox').addEventListener('click', (e) =>{
    if (queue.length >0) {
        queue[0]()
        queue.shift()
    }else e.currentTarget.style.display ='none'
})