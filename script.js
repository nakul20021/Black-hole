const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let particles = [];

for (let i = 0; i < 400; i++) {
    particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 400 + 50,
        speed: Math.random() * 0.02 + 0.01
    });
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.angle += p.speed;
        p.radius *= 0.995;

        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(" + (p.radius * 2) + ", 100%, 60%)";
        ctx.fill();

        if (p.radius < 10) {
            p.radius = Math.random() * 400 + 100;
        }
    });

    requestAnimationFrame(animate);
}

animate();