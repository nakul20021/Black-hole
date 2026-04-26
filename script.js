const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// ক্যানভাস সাইজ উইন্ডোর সমান করা
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// উইন্ডো রিসাইজ করলে সেন্টার ঠিক করা
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
});

const particles = [];
const textParticles = [];
const particleCount = 400;
const textCount = 15; // স্ক্রিনে কয়টি "Nakul" নাম ঘুরবে

// সাধারণ কণা (Particles) তৈরি
for (let i = 0; i < particleCount; i++) {
    particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * canvas.width / 2,
        speed: Math.random() * 0.02 + 0.005,
        size: Math.random() * 2 + 0.5,
        color: Math.random() * 360
    });
}

// নাম কণা (Text Particles) তৈরি
for (let i = 0; i < textCount; i++) {
    textParticles.push({
        text: "Nakul",
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 300 + 100,
        speed: Math.random() * 0.01 + 0.002, // টেক্সট কণা একটু ধীরে ঘুরবে
        fontSize: Math.random() * 8 + 10,     // ১০px থেকে ১৮px এর মধ্যে
        hue: Math.random() * 360
    });
}

function animate() {
    // ট্রেইল ইফেক্ট তৈরির জন্য হালকা কালো লেয়ার
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ১. সাধারণ কণাগুলো আঁকা
    particles.forEach(p => {
        p.angle += p.speed;
        p.radius *= 0.995; // কেন্দ্রের দিকে টানে

        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.color}, 80%, 60%)`;
        ctx.fill();

        // কণা কেন্দ্রে পৌঁছালে আবার বাইরে পাঠিয়ে দেওয়া
        if (p.radius < 5) {
            p.radius = Math.random() * (canvas.width / 2) + 100;
        }
    });

    // ২. নাম (Nakul) কণাগুলো আঁকা
    textParticles.forEach(tp => {
        tp.angle += tp.speed;
        tp.radius *= 0.997; // নামগুলো একটু ধীরে কেন্দ্রের দিকে যাবে
        tp.hue += 1; // ক্রমাগত রঙ বদলাবে

        const tx = centerX + Math.cos(tp.angle) * tp.radius;
        const ty = centerY + Math.sin(tp.angle) * tp.radius;

        ctx.save(); // স্টাইল সেভ করা
        ctx.translate(tx, ty); // টেক্সটের অবস্থানে নিয়ে যাওয়া
        ctx.rotate(tp.angle + Math.PI / 2); // ঘোরার দিকে মুখ করে থাকা

        ctx.fillStyle = `hsl(${tp.hue % 360}, 100%, 70%)`;
        ctx.font = `bold ${tp.fontSize}px 'Segoe UI', Tahoma, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(tp.text, 0, 0);
        
        ctx.restore(); // স্টাইল রিস্টোর করা

        // নাম কেন্দ্রে পৌঁছালে আবার বাইরে পাঠানো
        if (tp.radius < 10) {
            tp.radius = Math.random() * 300 + 200;
        }
    });

    requestAnimationFrame(animate);
}

// অ্যানিমেশন শুরু
animate();