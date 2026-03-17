export async function executeCode(language, code) {
  const langIds = {
    javascript: 93, // Node.js 20+
    python:     71, // Python 3.12
    java:       62  // Java 17
  };

  const res = await fetch("https://ce.judge0.com/submissions?wait=true", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source_code: code,
      language_id: langIds[language],
      stdin: ""
    })
  });

  const data = await res.json();
  
  if (data.stderr) {
    return { success: false, output: data.stdout, error: data.stderr };
  }
  return { success: true, output: data.stdout || "No output" };
}