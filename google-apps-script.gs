const SPREADSHEET_ID = "1UU0ls3bft1uOqoKjsMtL1Y2BmIw04R2R2hy5uvGo2B8";
const DATA_SHEET_NAME = "Data";
const SUBMISSIONS_SHEET_NAME = "Submissions";

function doGet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(DATA_SHEET_NAME);
  if (!sheet) return json_({ error: "Missing sheet: " + DATA_SHEET_NAME });
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return json_([]);
  const headers = values.shift().map(h => String(h).trim().toUpperCase());
  const entries = values.map((row, i) => {
    const o = {};
    headers.forEach((h, j) => o[h] = row[j] || "");
    return {
      id: String(i + 1),
      label: o.LABEL || o.CREDIT || "Untitled base",
      credit: o.CREDIT || "",
      creator: o.CREATOR || "",
      permission: o.PERMISSION || "",
      type: o.TYPE || "",
      tags: (o.TAGS || "").split(",").map(x => x.trim()).filter(Boolean),
      categories: (o.TAB || "").split(",").map(x => x.trim()).filter(Boolean),
      preview: o["PREVIEW IMAGE"] || "",
      site: o.LABEL || "",
      link: o.SITE || "",
      creatorLink: o.LINK || ""
    };
  }).filter(x => x.label);
  return json_(entries);
}

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p.website) return json_({ ok: true }); // honeypot spam trap
    const label = clean_(p.label, 120);
    const creator = clean_(p.creator, 100);
    const site = clean_(p.site, 60);
    const link = clean_(p.link, 500);
    if (!label || !creator || !site || !/^https?:\/\/\S+$/i.test(link)) {
      return json_({ ok: false, error: "Please provide a name, creator, platform, and valid URL." });
    }
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SUBMISSIONS_SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SUBMISSIONS_SHEET_NAME);
      sheet.appendRow(["Submitted at", "Status", "Name", "Creator", "Platform", "Listing URL", "Permission", "Base type(s)", "Tags"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), "Pending review", label, creator, site, link,
      clean_(p.permission, 80), clean_(p.type, 80), clean_(p.tags, 500)]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
function clean_(value, max) {
  return String(value || "").trim().replace(/[<>]/g, "").slice(0, max);
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}