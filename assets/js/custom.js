  /* 11_1 */
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.php-email-form.contact-form');
    /* 11_2 */
  if (contactForm) {
    contactForm.innerHTML = ''};

    contactForm.innerHTML = `

      <div class="row">
        <div class="col-md-6">
          <div class="form-field">
            <input type="text" name="first_name" class="form-input" id="firstName" placeholder="Vardenis" required>
            <label for="firstName" class="field-label">Vardas</label>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="form-field">
            <input type="text" name="last_name" class="form-input" id="lastName" placeholder="Pavardenis" required>
            <label for="lastName" class="field-label">Pavardė</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-field">
            <input type="email" class="form-input" name="email" id="userEmail" placeholder="pavyzdys@pastas.lt" required>
            <label for="userEmail" class="field-label">El. paštas</label>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="form-field">
            <input type="tel" class="form-input" name="phone" id="userPhone" placeholder="+370 6xx xxxxx" required>
            <label for="userPhone" class="field-label">Telefono numeris</label>
          </div>
        </div>
      </div>

      <div class="form-field">
        <input type="text" class="form-input" name="address" id="userAddress" placeholder="Įveskite adresą" required>
        <label for="userAddress" class="field-label">Adresas</label>
      </div>

      <div class="rating-section">
        <h3 class="rating-title">Vertinimas (1-10)</h3>

        <div class="rating-question">
          <p class="question-text">1. Ar patiko svetainė?</p>
          <div class="radio-group">
            ${[...Array(10)].map((_,i)=>`
              <label class="radio-label">
                <input type="radio" name="rating_likeness" value="${i+1}">
                <span>${i+1}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="rating-question">
          <p class="question-text">2. Dar kartą paklausiu, ar patiko svetainė?</p>
          <div class="radio-group">
            ${[...Array(10)].map((_,i)=>`
              <label class="radio-label">
                <input type="radio" name="rating_likeness2" value="${i+1}">
                <span>${i+1}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="rating-question">
          <p class="question-text">3. Koks oras lauke?</p>
          <div class="radio-group">
            ${[...Array(10)].map((_,i)=>`
              <label class="radio-label">
                <input type="radio" name="rating_weather" value="${i+1}">
                <span>${i+1}</span>
              </label>
            `).join('')}
          </div>
        </div>

      </div>

      <div class="my-3">
        <div class="loading">Siunčiama...</div>
        <div class="error-message"></div>
        <div class="sent-message">Jūsų žinutė sėkmingai išsiųsta.</div>
      </div>

      <button type="submit" class="send-button" disabled>
        Submit
        <span class="button-arrow">→</span>
      </button>

      <div id="submittedData" class="rating-output-box" style="display:none;"></div>
    `;

      /* 11_4.a.i */
    contactForm.addEventListener('submit', function(e) {
      if (document.querySelector(".send-button").disabled) return;
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      console.log("Formos duomenys:", data);

        /* 11_5 */
      const r1 = Number(data.rating_likeness || 0);
      const r2 = Number(data.rating_likeness2 || 0);
      const r3 = Number(data.rating_weather || 0);

      const avg = ((r1 + r2 + r3) / 3).toFixed(1);

        /* 11_4.a.ii */
      const box = document.getElementById('submittedData');
      box.style.display = 'block';

      box.innerHTML = `
        Vardas: ${data.first_name}<br>
          Pavardė: ${data.last_name}<br>
          El. paštas: ${data.email}<br>
          Tel. Numeris: ${data.phone}<br>
          Adresas: ${data.address}<br><br>

          ${data.first_name} ${data.last_name}: ${avg}
        `;

        /* 11_6 */
      const loading = this.querySelector('.loading');
      const sentMessage = this.querySelector('.sent-message');

      loading.style.display = 'block';

      setTimeout(() => {
        loading.style.display = 'none';
        sentMessage.style.display = 'block';

        setTimeout(() => sentMessage.style.display = 'none', 4000);
      }, 1500);
    });
});

  /* 11_pap.1.a */
function showError(input, message) {
  if (input.value.trim() === "") {
    return;
  }

  input.classList.add("input-error");

  let error = input.parentElement.querySelector(".error-text");
  if (!error) {
    error = document.createElement("div");
    error.classList.add("error-text");
    input.parentElement.appendChild(error);
  }
  error.textContent = message;
}


function clearError(input) {
  input.classList.remove("input-error");

  let error = input.parentElement.querySelector(".error-text");
  if (error) error.textContent = "";
}

  /* 11_pap.1.b */
function validateEmail(input) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (input.value.trim() === "") {
    showError(input, "El. paštas negali būti tuščias.");
    return false;
  }
  if (!regex.test(input.value)) {
    showError(input, "Neteisingas el. pašto formatas.");
    return false;
  }
  clearError(input);
  return true;
}

  /* 11_pap.1.c */
function validateName(input) {
  const regex = /^[A-Za-zÀ-ž\s-]+$/;
  if (input.value.trim() === "") {
      showError(input, "Šis laukas negali būti tuščias.");
      return false;
  }
  if (!regex.test(input.value)) {
    showError(input, "Leidžiamos tik raidės.");
    return false;
  }
  clearError(input);
  return true;
}

function validateSurname(input) {
  const regex = /^[A-Za-zÀ-ž\s-]+$/;
  if (input.value.trim() === "") {
    showError(input, "Šis laukas negali būti tuščias.");
    return false;
  }
  if (!regex.test(input.value)) {
    showError(input, "Leidžiamos tik raidės.");
    return false;
  }
  clearError(input);
  return true;
}

  /* 11_pap.1.d */
function validateAddress(input) {
  if (input.value.trim() === "") {
    showError(input, "Adresas negali būti tuščias.");
    return false;
  }
  if (!isNaN(input.value)) {
    showError(input, "Adresas turi būti tekstas, ne vien skaičius.");
    return false;
  }
  clearError(input);
  return true;
}

document.addEventListener("input", function (e) {
  if (e.target.matches("#firstName")) validateName(e.target);
  if (e.target.matches("#lastName")) validateName(e.target);
  if (e.target.matches("#userEmail")) validateEmail(e.target);
  if (e.target.matches("#userAddress")) validateAddress(e.target);
});

  /* 11_pap.2 */
document.addEventListener("focus", function (e) {
  if (e.target.matches("#userPhone")) {
    if (!e.target.value.startsWith("+3706")) {
      e.target.value = "+3706";
    }
  }
}, true);

function formatPhone(input) {
  let raw = input.value.replace(/[^\d]/g, "");

  if (!raw.startsWith("3706")) {
    raw = "3706";
  }
  raw = raw.slice(0, 11);

  input.value = "+" + raw;
}

function validatePhone(input) {
  const regex = /^\+3706\d{7}$/;

  if (!regex.test(input.value)) {
    showError(input, "Telefono formatas turi būti: +3706xxxxx");
    return false;
  }
  clearError(input);
  return true;
}

document.addEventListener("input", function (e) {
  if (e.target.matches("#userPhone")) {
    formatPhone(e.target);
    validatePhone(e.target);
    updateSubmitState();
  }
});

function validateRatings() {
  const r1 = document.querySelector('input[name="rating_likeness"]:checked');
  const r2 = document.querySelector('input[name="rating_likeness2"]:checked');
  const r3 = document.querySelector('input[name="rating_weather"]:checked');

  if (!r1 || !r2 || !r3) {
    return false;
  }
  return true;
}

/* 11_pap.3 */
function updateSubmitState() {
  const btn = document.querySelector(".send-button");

  const valid =
    validateName(document.querySelector("#firstName")) &&
    validateName(document.querySelector("#lastName")) &&
    validateEmail(document.querySelector("#userEmail")) &&
    validateAddress(document.querySelector("#userAddress")) &&
    validatePhone(document.querySelector("#userPhone")) &&
    validateRatings();

  btn.disabled = !valid;

  if (btn.disabled) {
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  } else {
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  }
}

document.addEventListener("input", updateSubmitState);