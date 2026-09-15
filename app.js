const promptEl = document.getElementById("prompt");
const styleEl = document.getElementById("style");
const ratioEl = document.getElementById("ratio");
const btn = document.getElementById("generateBtn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");

// Demo mode: this uses a public placeholder image service so the site works
// immediately. For real AI generation, replace generateDemoImage() with your
// preferred free AI image API call. Never put a private API key in this file.

function makeSeed(text) {
  let n = 0;
  for (let i = 0; i < text.length; i++) n = (n * 31 + text.charCodeAt(i)) >>> 0;
  return n;
}

function generateDemoImage(prompt, style, ratio) {
  const seed = makeSeed(prompt + style);
  const size = ratio === "16:9" ? "1024/576" : ratio === "9:16" ? "576/1024" : "768/768";
  return `https://picsum.photos/seed/${seed}/${size}`;
}

btn.addEventListener("click", () => {
  const prompt = promptEl.value.trim();
  if (!prompt) {
    statusEl.textContent = "Please write a prompt first.";
    promptEl.focus();
    return;
  }

  btn.disabled = true;
  statusEl.textContent = "Creating your picture…";

  setTimeout(() => {
    const url = generateDemoImage(prompt, styleEl.value, ratioEl.value);
    resultEl.classList.remove("hidden");
    resultEl.innerHTML = `
      <img src="${url}" alt="${prompt.replace(/"/g, "&quot;")}" />
      <div class="result-actions">
        <a class="download" href="${url}" target="_blank" rel="noopener">Open / Save Image ↗</a>
      </div>`;
    statusEl.textContent = "Demo image created. Connect an AI image API for real AI generation.";
    btn.disabled = false;
    resultEl.scrollIntoView({behavior:"smooth", block:"center"});
  }, 900);
});
