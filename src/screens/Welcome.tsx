import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col overflow-x-hidden">
      {/* TopAppBar Fragment */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-headline font-black text-primary tracking-tight text-3xl">Verba</span>
          </div>
          <Link to="/explore" className="font-headline text-primary font-semibold hover:bg-primary/10 rounded-lg transition-colors px-4 py-2">
            Skip
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center relative pt-20">
        {/* Background Ambient Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-container opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary-container opacity-25 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Side: Editorial Content */}
          <div className="md:col-span-7 flex flex-col items-start gap-8">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
                Master the art of <br />
                <span className="text-primary italic">flowing</span> dialogue.
              </h1>
              <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-lg leading-relaxed">
                Your AI Speaking Companion designed to bridge the gap between learning and living.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10">
              <Link to="/signin" className="px-8 py-4 bg-primary text-on-primary rounded-full font-headline font-semibold text-base shadow-xl shadow-primary/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all duration-300 ease-out flex items-center justify-center gap-2">
                Get Started
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link to="/explore" className="px-8 py-4 bg-secondary-container/50 text-on-secondary-container border border-secondary-container/80 rounded-full font-headline font-semibold text-base hover:bg-secondary-container hover:border-secondary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/20 active:scale-95 transition-all duration-300 ease-out flex items-center justify-center">
                Explore Method
              </Link>
            </div>
            
            <div className="pt-8 flex items-center gap-6">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden">
                  <img className="w-full h-full object-cover" alt="User 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl9BG8gZtjHo7bQ9yFyEPt-x13Lp8qBYstZzcn91f6UsT4IC83CaiNX4lmtliUOLL70di9W__NEbIlqcnkSsl0IKh9pM1SEPlhVGgewQ_NJp3htA6zW3pF2nIWjkJxPemN5iRilHwItGY6XR2vcmaejMqfvdOFA8dYUP90HChIViqst48x5xE9Ul4wIeu9iS01YgFpntVeTYkdBrZRc17ezw8B6D7hNengHP9P7dUNHZ2of0Z120C8ddeE78tldva-XCUOKW2FI8g" />
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden">
                  <img className="w-full h-full object-cover" alt="User 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVXO6EcnU4wO80cOYVQtir4cYtKDyGZcMWqp7qF9JwkMlGOjkNvbNVqpn6ZMmpWuQjCoUFmxixVqpZPcFqeM3ilp2eHMi6B5Mnyd-YRYpmAnm8EhxtXsINL95Ml_A9mzeUKVr_1MU6CIykwBl4PtQjTFoYJIUFI2hGNFzMcirTzPvfCdGyevjE4_w-BdFWDFLvJOVMJevoNz8oV4wPVN2pS4rTcZdMWpfnNNiSFyCkpQZVaAtlo73cxl15S2FcVEMOZklYuBl9LQY" />
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden">
                  <img className="w-full h-full object-cover" alt="User 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsUXDXAi0xmm1ISkG9Zo1YiXattft0Hb3avDzs1oSba5-O_F8seh0yzg5k59uDwaBbN6FAIk8jXBTtfgcjHfh53rvblZ16R4h9WOHmtONGE9kdqcKt25bSSz7Fzg6BzfXy2RjSasqrITY6BrNZlx9udBVnJ4WysPFq8JIvWgBKNbQy3NhAp5nAb8OnotDWQLeMnqCayfQLdZuGD6ohw4ek6KDOfdsDFHDDIkPclnqmIPPMIFz7t66dKcp9Egrjbb_0Gb6ORCRTmPQ" />
                </div>
              </div>
              <p className="font-body text-sm text-on-surface-variant font-medium">
                Join <span className="text-secondary font-bold">12,000+</span> learners <br />finding their voice today.
              </p>
            </div>
          </div>

          {/* Right Side: Signature Interaction Pulse Visual */}
          <div className="md:col-span-5 relative flex justify-center items-center py-12">
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-secondary to-secondary-container flex items-center justify-center shadow-2xl shadow-secondary/30 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]">
              <div className="w-20 h-20 bg-surface/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-on-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
              </div>
              
              {/* Floating Editorial Elements */}
              <div className="absolute -top-4 -right-4 bg-surface-container-lowest/80 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-[180px]">
                <p className="text-[12px] font-bold text-primary uppercase tracking-widest mb-1">Feedback</p>
                <p className="text-sm font-medium text-on-surface leading-snug">"Excellent pronunciation of 'Resonance'!"</p>
              </div>
              
              <div className="absolute -bottom-8 -left-4 bg-white/40 backdrop-blur-md p-4 rounded-3xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-bold">STREAK</p>
                  <p className="text-lg font-black text-on-surface">14 Days</p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-outline-variant/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-outline-variant/15 rounded-full pointer-events-none"></div>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 opacity-60">
          <p className="text-sm font-label">© 2024 Verba. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-label font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
