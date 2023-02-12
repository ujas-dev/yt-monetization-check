if (typeof browser === 'undefined') {
    browser = typeof chrome !== 'undefined' ? chrome : null;
}

function cLog(text, subtext = "") {
    subtext = subtext.trim() === "" ? "" : `(${subtext})`;
    console.log(`[Yt Monetization Check] ${text} ${subtext}`);
}

const uninstallUrl = "https://www.youtube.com/channel/UCtRq3uyJHpaGq3-elHKzDuA/";
browser.runtime.setUninstallURL(uninstallUrl);
browser.runtime.onInstalled.addListener(object => {
    const url = "https://www.youtube.com/channel/UCtRq3uyJHpaGq3-elHKzDuA/";
    if (object.reason === browser.runtime.OnInstalledReason.INSTALL) {
      browser.tabs.create({ url }, tab => {});
    }
  });