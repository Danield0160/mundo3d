class Mundo {
    posX = 0
    posZ = 0
    rotacion = 0
    rotacionV = 0


    velocidadX = 10
    velocidadZ = 10
    velocidadR = 1

    mundo = document.getElementById("world")
    baliza = document.getElementById("baliza")
    teclasPulsadas = new Set()

    constructor() {
        this.iniciarEscuchaTeclado()

        this.iniciarEscuchaRaton()
    }

    iniciarEscuchaTeclado() {

        setInterval(function () {
            for (const tecla of this.teclasPulsadas) {
                this.ejecutarMovimiento(tecla)
            }
        }.bind(this), 1)

        addEventListener("keydown", function (e) {
            this.teclasPulsadas.add(e.key)
        }.bind(this))

        addEventListener("keyup", function (e) {
            this.teclasPulsadas.delete(e.key)
        }.bind(this))

    }

    iniciarEscuchaRaton() {
        let obj = this
        function handleMouseLockChange() {
            if (document.pointerLockElement) {
                document.addEventListener('mousemove', handleMouseMove, false);
                obj.style.pointerEvents = "none"

            } else {
                document.removeEventListener('mousemove', handleMouseMove, false);
            }
        }

        function handleMouseMove(event) {
            console.log(event.target)
            var movementX = event.movementX || 0;
            var movementY = event.movementY || 0;
            obj.ejecutarCamara(movementX, movementY)
        }

        document.addEventListener('mouseup', function () {
            this.mundo.requestPointerLock();
        }.bind(this));

        document.addEventListener('mousedown', function () {
            document.exitPointerLock();
        }.bind(this));

        document.addEventListener('pointerlockchange', handleMouseLockChange.bind(this), false);
    }


    ejecutarMovimiento(tecla) {
        switch (tecla) {
            case "w":
                this.posZ += this.velocidadZ * Math.cos(this.rotacion / 57, 2958)
                this.posX -= this.velocidadX * Math.sin(this.rotacion / 57, 2958)
                break;

            case "s":
                this.posZ -= this.velocidadZ * Math.cos(this.rotacion / 57, 2958)
                this.posX += this.velocidadX * Math.sin(this.rotacion / 57, 2958)
                break;

            case "a":
                this.posZ += this.velocidadZ * Math.sin(this.rotacion / 57, 2958)
                this.posX += this.velocidadX * Math.cos(this.rotacion / 57, 2958)
                break;

            case "d":
                this.posZ -= this.velocidadZ * Math.sin(this.rotacion / 57, 2958)
                this.posX -= this.velocidadX * Math.cos(this.rotacion / 57, 2958)
                break;

            default:
                break;
        }
        this.actualizarMundo()
    }

    ejecutarCamara(x, y) {
        this.rotacion += x / 10
        this.rotacionV -= y / 10

        this.actualizarMundo()
    }


    actualizarMundo() {
        console.log(this.rotacion)
        // console.log(this.posX, this.posZ)
        this.mundo.style.transformOrigin = `${-this.posX + 1140}px ${800}px ${-this.posZ + 960}px`
        // console.log(this.mundo.style.transformOrigin)
        this.mundo.style.transform = `translateX(${this.posX}px) 
                                    translateZ(${this.posZ}px) 
                                    rotateX(${this.rotacionV}deg) 
                                    rotateY(${this.rotacion}deg) 
                                    `

    }
}


new Mundo()



function activarAlternarPantallaLaptop() {
    let abierto = false
    let pantalla = document.getElementById("pantalla")
    console.log("modo activado")

    document.getElementById("laptop").addEventListener("mouseup", function () {
        console.log("clicked")
        if (abierto) {
            abierto = false
            pantalla.style.transform = "rotateX(0deg)"
        } else {
            abierto = true
            pantalla.style.transform = "rotateX(-90deg)"
        }
        event.stopPropagation();

    })
}


activarAlternarPantallaLaptop()


Array.from(document.querySelectorAll("input")).forEach(function(hijo){
    hijo.addEventListener('mouseup', function (event) {
        
        // Detener la propagación del evento
        event.stopPropagation();
    })
})




// case "q":
//     this.rotacion = (this.rotacion - this.velocidadR) % 360
//     break;

// case "e":
//     this.rotacion = (this.rotacion + this.velocidadR) % 360
//     break;

// case "z":
//     this.rotacionV = (this.rotacionV + 0.5) % 360
//     break
// case "x":
//     this.rotacionV = (this.rotacionV - 0.5) % 360
//     break
