const monsters = {
    Emby:{
        position:{
    x:280,
    y:325
    },
    image: {
        src: 'images/embySprite.png'
    },
    frames:{
        max:4,
        hold:30
    },
    animate: true,
    name: 'Developer',
    attacks: [attacks.AskDryden,attacks.BruteForce]

},
    Bug:{
        position:{
            
    x:800,
    y:100
    },
    image:{
        src: 'images/bugSprite.png'
    },
    frames:{
        max:4,
        hold:30
    },
    animate: true,
    isEnemy: true,
    name: 'Bug',
    attacks: [attacks.BruteForce]
            
            
    }

}

