async function injectHTML(filePath, elem) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) return;
    const text = await response.text();
    elem.innerHTML = text;
    // Re-inject any scripts in the injected HTML
    elem.querySelectorAll("script").forEach(script => {
      const newScript = document.createElement("script");
      // Copy all attributes (including src, type, etc.)
      Array.from(script.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      // For inline scripts, set .textContent instead of using createTextNode
      if (!script.src) {
        newScript.textContent = script.innerHTML;
      }
      // Replace the old script with the new one
      // script.parentNode.replaceChild(newScript, script)
      elem.querySelectorAll("script").forEach(script => {
        const newScript = document.createElement("script");
        Array.from(script.attributes).forEach(attr =>
          newScript.setAttribute(attr.name, attr.value)
        );
        if (!script.src) {
          const content = script.textContent.trim();
          if (content) newScript.textContent = content;
        }
        script.parentNode.replaceChild(newScript, script);
      });
    });
  } catch (err) {
    console.error(err.message);
  }
}

function injectAll() {
  document.querySelectorAll("div[include]").forEach(elem => {
    injectHTML(elem.getAttribute("include"), elem);
  });
}

injectAll();
