'use client';

const glitchStyles = `
.glitch {
  position: relative;
  display: inline-block;
  user-select: none;
}

.glitch::after,
.glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

.glitch:not(.enable-on-hover)::after {
  left: 4px;
  text-shadow: var(--after-shadow, -2px 0 #EA580C);
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;
}
.glitch:not(.enable-on-hover)::before {
  left: -4px;
  text-shadow: var(--before-shadow, 2px 0 #00E5FF);
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;
}

.glitch.enable-on-hover::after,
.glitch.enable-on-hover::before {
  content: '';
  opacity: 0;
  animation: none;
}

.glitch.enable-on-hover:hover::after {
  content: attr(data-text);
  opacity: 1;
  left: 4px;
  text-shadow: var(--after-shadow, -2px 0 #EA580C);
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;
}
.glitch.enable-on-hover:hover::before {
  content: attr(data-text);
  opacity: 1;
  left: -4px;
  text-shadow: var(--before-shadow, 2px 0 #00E5FF);
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;
}

@keyframes animate-glitch {
  0%   { clip-path: inset(20% 0 50% 0); }
  5%   { clip-path: inset(10% 0 60% 0); }
  10%  { clip-path: inset(15% 0 55% 0); }
  15%  { clip-path: inset(25% 0 35% 0); }
  20%  { clip-path: inset(30% 0 40% 0); }
  25%  { clip-path: inset(40% 0 20% 0); }
  30%  { clip-path: inset(10% 0 60% 0); }
  35%  { clip-path: inset(15% 0 55% 0); }
  40%  { clip-path: inset(25% 0 35% 0); }
  45%  { clip-path: inset(30% 0 40% 0); }
  50%  { clip-path: inset(20% 0 50% 0); }
  55%  { clip-path: inset(10% 0 60% 0); }
  60%  { clip-path: inset(15% 0 55% 0); }
  65%  { clip-path: inset(25% 0 35% 0); }
  70%  { clip-path: inset(30% 0 40% 0); }
  75%  { clip-path: inset(40% 0 20% 0); }
  80%  { clip-path: inset(20% 0 50% 0); }
  85%  { clip-path: inset(10% 0 60% 0); }
  90%  { clip-path: inset(15% 0 55% 0); }
  95%  { clip-path: inset(25% 0 35% 0); }
  100% { clip-path: inset(30% 0 40% 0); }
}
`;

const GlitchText = ({
    children,
    speed = 0.5,
    enableShadows = true,
    enableOnHover = false,
    className = ""
}) => {
    const inlineStyles = {
        "--after-duration": `${speed * 3}s`,
        "--before-duration": `${speed * 2}s`,
        "--after-shadow": enableShadows ? "-2px 0 #EA580C" : "none",
        "--before-shadow": enableShadows ? "2px 0 #00E5FF" : "none"
    };
    const hoverClass = enableOnHover ? "enable-on-hover" : "";

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: glitchStyles }} />
            <span
                className={`glitch ${hoverClass} ${className}`}
                style={inlineStyles}
                data-text={children}
            >
                {children}
            </span>
        </>
    );
};

export default GlitchText;
