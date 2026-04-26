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
        radius: Math.random() * canvas.width / 2 + 50, // শুরুতেই একটু দূরে তৈরি হবে
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
    // ট্রেইল ইফেক্ট তৈরির জন্য হালকা কালো লেয়ার (০.১ দেওয়া হয়েছে যাতে ট্রেইল লম্বা হয়)
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
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

        // কণা গহ্বরের খুব কাছে পৌঁছালে আবার বাইরে পাঠিয়ে দেওয়া (গহ্বরের ভেতরে হারাবে)
        if (p.radius < 40) {
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

        // নাম গহ্বরের কাছে পৌঁছালে আবার বাইরে পাঠানো
        if (tp.radius < 50) {
            tp.radius = Math.random() * 300 + 200;
        }
    });

    // ৩. ব্ল্যাক হোল ও ইভেন্ট হরাইজন তৈরি (সবার উপরে থাকার জন্য এটি শেষে)
    
    // ইভেন্ট হরাইজন (গহ্বরের চারপাশের হালকা রিং বা আভা)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 62, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.01)"; // খুব হালকা আলো
    ctx.lineWidth = 0.3;
    ctx.stroke();

    // ব্ল্যাক হোলের গহ্বর (রেডিয়াল গ্রেডিয়েন্ট দিয়ে শুষে নেওয়ার মতো ভাব)
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
    gradient.addColorStop(0, 'black');        // কেন্দ্র একদম কালো
    gradient.addColorStop(0.7, 'black');      // মাঝের অংশও কালো
    gradient.addColorStop(1, 'transparent');  // প্রান্তে এসে মিশে যাবে

    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    
    // গহ্বরের চারপাশে একটা কালো শ্যাডো, যেন আরও গভীর লাগে
    ctx.shadowBlur = 40;
    ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
    ctx.fill();
    
    ctx.shadowBlur = 0; // অন্য কিছুতে যেন শ্যাডো না পড়ে তাই রিসেট

    requestAnimationFrame(animate);
}

// অ্যানিমেশন শুরু
animate();
