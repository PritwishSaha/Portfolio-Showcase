window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".download-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const project = btn.getAttribute("data-project");

      // Create a new ZIP
      const zip = new JSZip();

      try {
        // Fetch HTML, CSS, JS files
        const html = await fetch(`projects/${project}.html.txt`).then(res => res.text());
        const css  = await fetch(`projects/${project}.css.txt`).then(res => res.text());
        const js   = await fetch(`projects/${project}.js.txt`).then(res => res.text());

        // Add them to ZIP
        zip.file(`${project}.html`, html);
        zip.file(`${project}.css`, css);
        zip.file(`${project}.js`, js);

        // Generate and trigger download
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${project}.zip`);
      } catch (err) {
        alert("⚠️ Could not fetch project files. Make sure they exist in 'projects' folder.");
        console.error(err);
      }
    });
  });
});
