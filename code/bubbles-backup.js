// setup
var width =  window.innerWidth;
var height = document.body.scrollHeight;
// create canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;
// print some info
console.log("Page height:",height);
console.log(ctx);

// setting some context values
ctx.fillStyle = "white";
ctx.globalAlpha = 0.1;
ctx.strokeStyle = "pink"
ctx.lineWidth = 3;

// draw test rect in the middle of the screen
ctx.fillRect(width/2 - 25, height/2 - 25, 50, 50);


// define classes
class Particle
{
    constructor(effect)
    {
        this.effect = effect;

        this.width = 100;
        this.height = 100;
        this.radius = 20;
        this.x = this.radius +  Math.random() * (width - this.radius * 2);
        this.y = height + this.radius * 2 + 10;

        this.speed = 3;
        this.dx = 0;
        this.dy = -1;

        this.health = Math.random() * 300;
    }

    draw()
    {
        ctx.fillStyle ="hsl(" + (this.x / width) * 360 + ", 100%, 50%)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, deg2rad(360));
        ctx.fill();
        ctx.stroke();
    }

    update()
    {
        // move x
        this.x += this.speed * this.dx;

        // move y
        this.y += this.speed * this.dy;


        // decrease health
        this.health -= 1;

        // kill condition
        if( this.y < -this.radius + 10)
            this.effect.particles = this.effect.particles.filter(p => p != this);

        console.log(this.effect.particles.length);
    }

}

class Effect {
    constructor()
    {
        this.particles = [];
        this.N = 1; // how many objects will createPs make when called
    }

    createPs()
    {
        for(let i = 0; i < this.N; i++)
        {
            this.particles.push(new Particle(this));
        }
    }

    update()
    {
        // draw all particles
        this.particles.forEach(p => {
            p.draw();
            p.update();
        });
    }

}

// define functions
function deg2rad(deg) // convertes degrees into radian
{
    return deg * Math.PI/180;
}

function update_size() // updates width and hight
{
    // recalculate width and height
    width = window.innerWidth;
    height = document.body.scrollHeight;
    canvas.width = width;
    canvas.height = height;
    console.log("okay", width, "owo", height);
}

// event handlers
window.addEventListener("resize", update_size);

// objects
const effect = new Effect();

// the animation loop ( its like a game loop that updates every frame )
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();

    requestAnimationFrame(update);
}

// timers
setInterval(effect.createPs.bind(effect), 500);

update();
