import { useState, useEffect, useRef } from "react";

const categories = [
  { id: "business", emoji: "💼", label: "Business Idea", tag: "Professional", placeholder: "Describe your business idea or paste your website link...", prompt: "Roast this business idea like a friend who loves them but cannot let this slide. Write like a real person texting — casual, funny, NO bullet points, NO markdown, NO asterisks, NO dashes, NO formal structure. Just natural flowing sentences with emojis scattered naturally. Start with one killer sentence that captures everything wrong. Then 2-3 sentences of roasting that flow naturally. Then a line break and 'okay but fix it:' followed by 3 natural tips in sentence form. End with one warm hype line. Sound like a real human, not an AI report. Max 90 words." },
  { id: "instagram", emoji: "📸", label: "Instagram Profile", tag: "Social", placeholder: "Paste your Instagram bio or describe your profile...", prompt: "Roast this Instagram profile like you're voice-noting your bestie about it. Casual, real, funny. NO bullet points, NO markdown, NO lists, NO formal structure. Just flowing sentences like a real person would type. Start savage, get funnier, end warm. Sprinkle emojis naturally. Then 'glow up tho:' and 3 tips written as normal sentences. One hype closer. Sound like a human, not a robot. Max 90 words." },
  { id: "cv", emoji: "📄", label: "CV / Resume", tag: "Professional", placeholder: "Paste your CV or describe your experience...", prompt: "Roast this CV like you're reading it aloud dramatically to your coworkers. Real human energy, NO bullet points, NO markdown, flowing sentences with natural pauses. Start with one devastating sentence. 2-3 funny observations as natural text. Then 'but actually:' followed by 3 real tips in sentence form. End encouraging. Sound like a person, not an AI. Max 90 words." },
  { id: "linkedin", emoji: "🤝", label: "LinkedIn Profile", tag: "Professional", placeholder: "Paste your LinkedIn bio or describe your profile...", prompt: "Roast this LinkedIn profile like you're reacting to it live with your friend. Natural flowing text, NO bullet points, NO markdown, NO lists. Real human texting style with emojis placed naturally. Start brutal, get funny, give real tips naturally at the end after 'no but seriously:'. One hype closer. Human voice only. Max 90 words." },
  { id: "rishta", emoji: "💘", label: "Rishta Profile", tag: "Desi", placeholder: "Describe your rishta bio or matrimonial profile...", prompt: "Roast this rishta profile as a desi aunty with opinions. Write like a real aunty would talk — natural sentences, mix Urdu/desi phrases with English naturally, NO bullet points, NO lists, NO formal structure. Just flowing aunty energy. Start iconic, get funnier, then give real advice in natural sentences after 'beta sun:'. End with dua or hype. Real human desi voice. Max 90 words." },
  { id: "startup", emoji: "🚀", label: "Startup Idea", tag: "Professional", placeholder: "Describe your startup idea in detail...", prompt: "Roast this startup pitch like a friend who has seen too many Shark Tank episodes. Flowing natural sentences, NO bullets, NO markdown, NO lists. Real human voice with emojis placed naturally. Start with one reaction line, roast in 2-3 flowing sentences, then give real tips naturally after 'okay but if you insist:'. One hype closer. Sound like a human. Max 90 words." },
  { id: "situationship", emoji: "💀", label: "Situationship", tag: "🔥 Viral", placeholder: "Describe your situationship... be honest bestie 💀", prompt: "Roast this situationship like the honest best friend they need. Natural flowing sentences, NO bullet points, NO markdown, real texting energy. Savage but warm. Use words like 'bestie', 'no cap', 'delulu' naturally in sentences. Start with one killer line, roast naturally in 2-3 sentences, then give real advice after 'okay but you deserve:'. End with 'you're the prize, act like it' energy. Sound human and warm. Max 90 words." },
  { id: "texting", emoji: "📱", label: "Texting Style", tag: "🔥 Viral", placeholder: "Paste a message you sent or describe how you text people...", prompt: "Roast this texting style like you're showing the receipts to the group chat. Natural sentences, NO bullets, NO markdown, real chaotic energy. Start with one iconic sentence about their texting crimes. Roast naturally in 2-3 flowing sentences. Then give tips in natural sentence form after 'text like this instead:'. One funny closer. Real human voice. Max 90 words." },
  { id: "routine", emoji: "😴", label: "Daily Routine", tag: "🔥 Viral", placeholder: "Describe your typical day from morning to night...", prompt: "Roast this daily routine like you're judging a friend's lifestyle choices with love. Natural flowing sentences, NO bullets, NO markdown. Start with one dramatic observation. Roast naturally in 2-3 sentences. Then give real tips in normal sentences after 'but what if:'. One motivating closer. Real human voice, not a wellness robot. Max 90 words." },
  { id: "spotify", emoji: "🎵", label: "Music Taste", tag: "🔥 Viral", placeholder: "Describe your music taste or list your top artists/songs...", prompt: "Roast this music taste like a friend who just saw their Spotify wrapped and is CONCERNED. Natural flowing text, NO bullets, NO markdown, real chaotic energy. Start with one iconic line. Roast in 2-3 natural sentences. Then give tips/suggestions in normal sentences after 'listen to this instead:'. One hype closer. Real human voice. Max 90 words." },
  { id: "rant", emoji: "😤", label: "Are You The Problem?", tag: "Gen Z", placeholder: "Rant about someone or something — we'll tell you the truth 💀", prompt: "Read this rant and give the honest verdict. Write like a real friend responding — natural sentences, NO bullets, NO markdown, conversational flow. Start with a clear verdict line. Then give honest thoughts in 2-3 flowing sentences. Then real reflections after 'real talk:'. End with love. Sound like an honest human friend. Max 90 words." },
  { id: "aesthetic", emoji: "🛍️", label: "Aesthetic / Vibe", tag: "Gen Z", placeholder: "Describe your aesthetic, style, or overall vibe...", prompt: "Roast this aesthetic like a fashion-obsessed friend reacting in real time. Natural flowing sentences, NO bullets, NO markdown, real creative energy. Start with one iconic line. Roast in 2-3 natural sentences. Give tips in sentence form after 'actual glow up:'. One hype closer. Real human creative voice. Max 90 words." },
];

const loadingMessages = [
  "Summoning the AI roast master... 🔥",
  "Reading your digital soul... 👀",
  "Preparing surgical strikes... 💀",
  "This is gonna hurt... 😈",
  "Almost done roasting... 🍖",
];

export default function RoastMe() {
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [roastCount, setRoastCount] = useState(0);
  const roastRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRoastCount(Math.floor(Math.random() * 900) + 12400);
  }, []);

  const startLoading = () => {
    let i = 0;
    setLoadingMsg(loadingMessages[0]);
    intervalRef.current = setInterval(() => {
      i = (i + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[i]);
    }, 1200);
  };

  const stopLoading = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // PASTE YOUR N8N WEBHOOK URL HERE
  const N8N_WEBHOOK_URL = "https://stellakhayal87.app.n8n.cloud/webhook-test/roast";

  const handleRoast = async () => {
    if (!selected || !input.trim()) return;
    setRoast("");
    setLoading(true);
    startLoading();

    try {
      const cat = categories.find((c) => c.id === selected);
      const fullPrompt = cat.prompt + "\n\nHere's what to roast:\n" + input;
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      const data = await response.json();
      const text = data.roast || "Something went wrong. Try again!";
      setRoast(text);
      setRoastCount((c) => c + 1);
      setTimeout(() => roastRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      setRoast("Oops! The roast machine broke. Try again");
    } finally {
      stopLoading();
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setRoast("");
    setInput("");
    setSelected(null);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Space Grotesk', 'DM Sans', system-ui, sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }

        .blob1 {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,60,0,0.15) 0%, transparent 70%);
          top: -200px; right: -200px; pointer-events: none; z-index: 0;
          animation: drift 8s ease-in-out infinite alternate;
        }
        .blob2 {
          position: fixed; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,200,0,0.1) 0%, transparent 70%);
          bottom: -150px; left: -150px; pointer-events: none; z-index: 0;
          animation: drift 10s ease-in-out infinite alternate-reverse;
        }
        @keyframes drift { from { transform: scale(1) translate(0,0); } to { transform: scale(1.1) translate(20px, 20px); } }

        .cat-btn {
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 14px 18px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; gap: 10px;
          color: #fff; font-size: 14px; font-weight: 500;
          font-family: 'Space Grotesk', sans-serif;
          text-align: left;
        }
        .cat-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,100,0,0.5);
          transform: translateY(-2px);
        }
        .cat-btn.active {
          background: rgba(255,80,0,0.15);
          border-color: #ff5000;
          box-shadow: 0 0 20px rgba(255,80,0,0.2);
        }

        .roast-btn {
          background: linear-gradient(135deg, #ff5000, #ff9000);
          border: none; border-radius: 16px;
          padding: 18px 40px;
          font-size: 18px; font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          color: #fff; cursor: pointer;
          transition: all 0.2s;
          letter-spacing: -0.3px;
          box-shadow: 0 4px 30px rgba(255,80,0,0.4);
        }
        .roast-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 40px rgba(255,80,0,0.5);
        }
        .roast-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .textarea {
          width: 100%; background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 18px;
          color: #fff; font-size: 15px; font-family: 'DM Sans', sans-serif;
          resize: vertical; min-height: 130px;
          transition: border-color 0.2s; outline: none;
          line-height: 1.6;
        }
        .textarea:focus { border-color: rgba(255,80,0,0.5); }
        .textarea::placeholder { color: rgba(255,255,255,0.3); }

        .roast-card {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,80,0,0.3);
          border-radius: 20px; padding: 28px;
          white-space: pre-wrap; line-height: 1.8;
          font-size: 15px; color: #f0f0f0;
          animation: slideUp 0.4s ease;
          box-shadow: 0 0 40px rgba(255,80,0,0.1);
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .action-btn {
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 12px; padding: 12px 20px;
          color: #fff; cursor: pointer; font-size: 14px;
          font-family: 'Space Grotesk', sans-serif; font-weight: 500;
          transition: all 0.2s;
        }
        .action-btn:hover { background: rgba(255,255,255,0.15); transform: translateY(-1px); }

        .loading-ring {
          width: 40px; height: 40px;
          border: 3px solid rgba(255,80,0,0.2);
          border-top-color: #ff5000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .counter-badge {
          background: rgba(255,80,0,0.15);
          border: 1px solid rgba(255,80,0,0.3);
          border-radius: 100px; padding: 6px 16px;
          font-size: 13px; color: #ff8040;
          font-weight: 500; display: inline-block;
        }

        .fire-text {
          background: linear-gradient(135deg, #ff5000, #ffaa00, #ff5000);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }

        .tag {
          background: rgba(255,255,255,0.08);
          border-radius: 8px; padding: 4px 10px;
          font-size: 12px; color: rgba(255,255,255,0.5);
          font-weight: 500;
        }
      `}</style>

      <div className="noise" />
      <div className="blob1" />
      <div className="blob2" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ marginBottom: 16 }}>
            <span className="counter-badge">🔥 {roastCount.toLocaleString()} roasts delivered</span>
          </div>
          <h1 style={{
            fontSize: "clamp(48px, 10vw, 80px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-3px",
            marginBottom: 16,
          }}>
            <span className="fire-text">ROAST</span>
            <br />
            <span style={{ color: "#fff" }}>MY LIFE 🔥</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
            Submit anything. We roast it. Brutally honest. Surprisingly helpful.
          </p>
        </div>

        {/* Category Selection */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", marginBottom: 14, textTransform: "uppercase" }}>
            What are we roasting today?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-btn ${selected === cat.id ? "active" : ""}`}
                onClick={() => { setSelected(cat.id); setRoast(""); setInput(""); }}
              >
                <span style={{ fontSize: 20 }}>{cat.emoji}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span>{cat.label}</span>
                  {cat.tag === "🔥 Viral" && (
                    <span style={{ fontSize: 10, color: "#ff8040", fontWeight: 700 }}>🔥 VIRAL</span>
                  )}
                  {cat.tag === "Desi" && (
                    <span style={{ fontSize: 10, color: "#ff8040", fontWeight: 700 }}>🇵🇰 DESI</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        {selected && (
          <div style={{ marginBottom: 24, animation: "slideUp 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Drop it here
              </p>
              <span className="tag">{categories.find(c => c.id === selected)?.label}</span>
            </div>
            <textarea
              className="textarea"
              placeholder={categories.find((c) => c.id === selected)?.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        )}

        {/* Roast Button */}
        {selected && (
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <button
              className="roast-btn"
              onClick={handleRoast}
              disabled={loading || !input.trim()}
            >
              {loading ? "Roasting... 🍖" : "Roast Me 🔥"}
            </button>
            <p style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              Free. Brutal. Honest. You asked for it.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "40px 0", animation: "slideUp 0.3s ease" }}>
            <div className="loading-ring" style={{ margin: "0 auto 20px" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>{loadingMsg}</p>
          </div>
        )}

        {/* Roast Result */}
        {roast && !loading && (
          <div ref={roastRef} style={{ animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Your Roast is Ready 💀
              </p>
            </div>
            <div className="roast-card">{roast}</div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              <button className="action-btn" onClick={handleCopy}>
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
              <button
                className="action-btn"
                style={{ background: "rgba(37,211,102,0.15)", borderColor: "rgba(37,211,102,0.4)", color: "#25d366" }}
                onClick={() => {
                  const shareTexts = [
                    `okay bestie I just got roasted by AI and I'm not okay 😭\n\n${roast}\n\ntry yours 👉 roastmylife.com (it's free and it HURTS)`,
                    `I asked AI to roast me and now I need therapy 💀\n\n${roast}\n\nget yours here 👉 roastmylife.com`,
                    `bro this AI said things my friends were too scared to say 😭\n\n${roast}\n\nyour turn 👉 roastmylife.com`,
                  ];
                  const text = shareTexts[Math.floor(Math.random() * shareTexts.length)];
                  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                  window.open(url, "_blank");
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "middle", marginRight: 6 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>
              <button
                className="action-btn"
                style={{ background: "rgba(225,48,108,0.15)", borderColor: "rgba(225,48,108,0.4)", color: "#e1306c" }}
                onClick={() => {
                  const shareTexts = [
                    `okay I asked AI to roast me and I'm still recovering 😭\n\n${roast}\n\ntry yours 👉 roastmylife.com (free + brutal)`,
                    `the AI said what my friends were too scared to say 💀\n\n${roast}\n\nget roasted 👉 roastmylife.com`,
                    `POV: you asked for honesty and the AI DELIVERED 😭🔥\n\n${roast}\n\nyour turn 👉 roastmylife.com`,
                  ];
                  const text = shareTexts[Math.floor(Math.random() * shareTexts.length)];
                  navigator.clipboard.writeText(text);
                  alert("✅ Copied! Paste it in your Instagram caption or story 🔥");
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "middle", marginRight: 6 }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </button>
              <button className="action-btn" onClick={handleReset}>
                🔄 Again
              </button>
            </div>

            {/* Upsell */}
            <div style={{
              marginTop: 28,
              background: "rgba(255,80,0,0.08)",
              border: "1.5px solid rgba(255,80,0,0.2)",
              borderRadius: 16, padding: 20,
              textAlign: "center",
            }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Want a full audit with step-by-step fixes?</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#ff8040" }}>Get the Pro Roast — $9 🔥</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>Detailed breakdown + action plan on WhatsApp</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 60, color: "rgba(255,255,255,0.2)", fontSize: 13 }}>
          Made with 🔥 by StellaAItemplates
        </div>
      </div>
    </div>
  );
}
