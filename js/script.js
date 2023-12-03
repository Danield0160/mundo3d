class Mundo {
    posX = 0
    posZ = 0
    rotacion = 0
    rotacionV =0


    velocidadX = 10
    velocidadZ = 10
    velocidadR = 1

    mundo = document.getElementById("world")
    baliza = document.getElementById("baliza")
    teclasPulsadas = new Set()

    constructor() {
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

    ejecutarMovimiento(tecla) {
        switch (tecla) {
            case "w":
                this.posZ += this.velocidadZ * Math.cos(this.rotacion/57,2958)
                this.posX -= this.velocidadX * Math.sin(this.rotacion/57,2958)
                break;

            case "s":
                this.posZ -= this.velocidadZ * Math.cos(this.rotacion/57,2958)
                this.posX += this.velocidadX * Math.sin(this.rotacion/57,2958)
                break;

            case "a":
                this.posZ += this.velocidadZ * Math.sin(this.rotacion/57,2958)
                this.posX += this.velocidadX * Math.cos(this.rotacion/57,2958)
                break;

            case "d":
                this.posZ -= this.velocidadZ * Math.sin(this.rotacion/57,2958)
                this.posX -= this.velocidadX * Math.cos(this.rotacion/57,2958)
                break;


            case "q":
                this.rotacion = (this.rotacion-this.velocidadR)%360
                break;

            case "e":
                this.rotacion = (this.rotacion+this.velocidadR)%360
                break;

            case "z":
                this.rotacionV = (this.rotacionV + 0.5)%360
                break
            case "x":
                this.rotacionV = (this.rotacionV - 0.5)%360
                break

            default:
                break;
        }
        this.actualizarMundo()
    }


    actualizarMundo() {
        console.log(this.rotacion)
        // console.log(this.posX, this.posZ)
        this.mundo.style.transformOrigin = `${-this.posX +840}px ${800}px ${-this.posZ +960}px`
        // console.log(this.mundo.style.transformOrigin)
        this.mundo.style.transform = `translateX(${this.posX}px) 
                                    translateZ(${this.posZ}px) 
                                    rotateX(${this.rotacionV}deg) 
                                    rotateY(${this.rotacion}deg) 
                                    `

    }
}


new Mundo()

