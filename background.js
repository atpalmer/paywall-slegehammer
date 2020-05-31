'use strict';


chrome.runtime.onInstalled.addListener(function() {
  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({ file: './inject/script.js' });
  });
});
