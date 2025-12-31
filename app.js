const nameEl = document.getElementById("name");
const timeEl = document.getElementById("time");
const expiryEl = document.getElementById("expiry");
const list = document.getElementById("list");
const status = document.getElementById("status");
const explain = document.getElementById("explain");


/*************************
 * ONLINE CHECK (FAST)
 *************************/
function isOnline() {
  return navigator.onLine;
}

/*************************
 * DATABASE
 *************************/
let db;
const req = indexedDB.open("jivaiDB", 2);

req.onupgradeneeded = e => {
  db = e.target.result;
  if (!db.objectStoreNames.contains("medicines")) {
    db.createObjectStore("medicines", { keyPath: "id" });
  }
};

req.onsuccess = e => {
  db = e.target.result;
  loadMedicines();
};

/*************************
 * ADD MEDICINE
 *************************/
function addMedicine() {
  const name = nameEl.value.trim();
  const time = timeEl.value;
  const expiry = expiryEl.value;

  if (!name || !time || !expiry) {
    alert("Please fill all fields");
    return;
  }

  const tx = db.transaction("medicines", "readwrite");
  const store = tx.objectStore("medicines");

  store.getAll().onsuccess = e => {
    const exists = e.target.result.some(
      m => m.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert("⚠️ Medicine already exists");
      return;
    }

    store.add({
      id: Date.now(),
      name,
      time,
      expiry,
      lastNotified: null,
      lastTakenDate: null
    });
  };

  tx.oncomplete = () => {
    nameEl.value = "";
    timeEl.value = "";
    expiryEl.value = "";
    loadMedicines();   // 🔥 THIS WAS MISSING
  };

  tx.onerror = () => {
    alert("Failed to add medicine");
  };
}


/*************************
 * LOAD + SAFETY LOGIC
 *************************/
let lastRiskReason = "general";

function loadMedicines() {
  const tx = db.transaction("medicines", "readonly");
  tx.objectStore("medicines").getAll().onsuccess = e => {
    render(e.target.result);
  };
}

function render(meds) {
  list.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  let statusText = "🟢 All medicines safe";
  lastRiskReason = "general";

  meds.forEach(m => {
    let warn = "";
    const [h, min] = m.time.split(":").map(Number);
    const medMin = h * 60 + min;

    if (m.expiry < today) {
      warn = " ❌ EXPIRED";
      statusText = "🔴 Expired medicine detected";
      lastRiskReason = "expired";
    } else if (medMin < nowMin && m.lastTakenDate !== today) {
      warn = " ⚠️ DOSE MISSED";
      statusText = "🟡 Missed dose detected";
      if (lastRiskReason !== "expired") lastRiskReason = "missed";
    }

    const li = document.createElement("li");
    li.innerText = `${m.name} | ${m.time} | Exp: ${m.expiry}${warn}`;
    list.appendChild(li);
  });

  status.innerText = statusText + (isOnline() ? " 🌐 Online" : " 📵 Offline");
}

/*************************
 * NOTIFICATIONS (FIXED)
 *************************/
function enableNotifications() {
  Notification.requestPermission().then(p => {
    if (p === "granted") {
      alert("Notifications enabled");
    }
  });
}

setInterval(() => {
  if (!db || Notification.permission !== "granted") return;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const tx = db.transaction("medicines", "readwrite");
  const store = tx.objectStore("medicines");

  store.getAll().onsuccess = e => {
    e.target.result.forEach(m => {
      const [h, min] = m.time.split(":").map(Number);
      const medMin = h * 60 + min;

      if (Math.abs(nowMin - medMin) === 0 && m.lastNotified !== nowMin) {
        new Notification("Medicine Reminder", {
          body: `Time to take ${m.name}`
        });

        m.lastNotified = nowMin;
        store.put(m);
      }
    });
  };
}, 60000);

/*************************
 * AZURE SAFETY EXPLAIN
 *************************/
async function explainSafety() {
  explain.innerText = "Fetching cloud explanation...";

  try {
    const res = await fetch(
      "https://jivai-safety-explain-ebgdg8hee9avcugp.centralindia-01.azurewebsites.net/api/explain",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: lastRiskReason })
      }
    );

    const data = await res.json();

    // 🔥 THIS LINE UPDATES UI 🔥
    explain.innerText = data.explanation;

  } catch (err) {
    console.error(err);
    explain.innerText = "Offline mode. Local safety active.";
  }
}

/*************************
 * SERVICE WORKER
 *************************/
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}


/*************************
 * delete medine
 *************************/
function deleteExpiredMedicines() {
  const today = new Date().toISOString().split("T")[0];

  const tx = db.transaction("medicines", "readwrite");
  const store = tx.objectStore("medicines");

  store.getAll().onsuccess = (e) => {
    e.target.result.forEach(med => {
      if (med.expiry < today) {
        store.delete(med.id);
      }
    });
  };

  tx.oncomplete = loadMedicines;
}


