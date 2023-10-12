
const targetLanguage = document.querySelector("#target-language");
const sourceLanguage = document.querySelector("#source-language");
const sourceText = document.querySelector("#source-text");
const targetText = document.querySelector("#target-text");
const btnTranslate = document.querySelector("#btn-translate");

async function getLanguages() {
  const response = await fetch(
    "https://text-translator2.p.rapidapi.com/getLanguages",
    {
      headers: {
        "X-RapidAPI-Key": "3fe6aa6da0msh84aea2499cb8e94p1a5e6cjsnac0912403e60",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  renderLanguages(data.data.languages, sourceLanguage);
  renderLanguages(data.data.languages, targetLanguage);
}

getLanguages();

function renderLanguages(languages, select) {
  languages.forEach((language) => {
    select.innerHTML += `<option value="${language.code}">${language.name}</option>`;
  });
}

async function translateText() {
  if (!sourceLanguage.value || !targetLanguage.value || !sourceText.value) {
    return;
  }

  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", sourceLanguage.value);
  encodedParams.append("target_language", targetLanguage.value);
  encodedParams.append("text", sourceText.value);

  const response = await fetch(
    "https://text-translator2.p.rapidapi.com/translate",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "3fe6aa6da0msh84aea2499cb8e94p1a5e6cjsnac0912403e60",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: encodedParams,
    }
  );
  const data = await response.json();

  targetText.value = data.data.translatedText;
}

btnTranslate.onclick = translateText;