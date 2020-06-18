
(function() {
  function _removeElement(el) {
    if(!el) {
      return;
    }
    el.parentElement.removeChild(el);
  }

  function _getDivsByClassPrefix(text) {
    return Array.from(document.getElementsByTagName('div')).filter(el => {
      const cls = el.getAttribute('class')
      return cls && cls.startsWith(text)
    });
  }

  function _hammer_dssMeterup() {
    const htmlTag = document.getElementsByTagName('html')[0]
    htmlTag.removeAttribute('data-dss-meterup');
    htmlTag.removeAttribute('data-ssor-modalup');

    _removeElement(document.getElementById('reg-overlay'));
    _removeElement(document.getElementById('ensNotifyBanner'));

    // Move HTML to a nested frame to dodge window event listeners
    Array.from(document.getElementsByTagName('script')).forEach(_removeElement);
    const pageHTML = htmlTag.innerHTML;
    document.body.innerHTML = '<iframe id="sledgehammerFrame" style="height: 95vh; width: 100vw; border: 0; margin: 0;"></iframe>';
    document.getElementById('sledgehammerFrame').contentWindow.document.write('<html><base target="_parent">' + pageHTML + '</html>');
  }

  function _hammer_tpModal() {
    _removeElement(document.getElementsByClassName('tp-modal')[0]);
    _removeElement(document.getElementsByClassName('tp-backdrop')[0]);
    document.getElementsByTagName('body')[0].removeAttribute('class');
  }

  function apnews() {
    _hammer_tpModal();
  }

  function bloomberg() {
    document.getElementsByTagName('html')[0].removeAttribute('data-paywall-overlay-status');
    document.getElementsByTagName('body')[0].removeAttribute('data-paywall-overlay-status');
    _removeElement(document.getElementById('graphics-paywall-overlay'));
  }

  function businessinsider() {
    _hammer_tpModal();
  }

  function chicagotribune() {
    _hammer_dssMeterup();
  }

  function forbes() {
    _removeElement(document.getElementsByClassName('fbs-auth__adblock')[0]);
    document.getElementsByTagName('body')[0].removeAttribute('class');
  }

  function foreignpolicy() {
    _hammer_tpModal();
  }

  function latimes() {
    _hammer_dssMeterup();
  }

  function miamiherald() {
    _removeElement(document.getElementsByClassName('fc-dialog-overlay')[0]);
    _removeElement(document.getElementsByClassName('fc-dialog-container')[0]);
    document.getElementsByTagName('body')[0].removeAttribute('style');
  }

  function nytimes() {
    _removeElement(document.getElementById('gateway-content'));
    _removeElement(document.getElementById('app').firstChild.firstChild.lastChild);
    document.body.style.overflow = 'scroll';
    document.getElementById('app').firstChild.firstChild.style.position = 'static';
    document.getElementById('app').firstChild.firstChild.style.overflow = 'visible';
  }

  function realclearpolitics() {
    _removeElement(document.getElementsByClassName('adb-overlay')[0]);
    _removeElement(document.getElementsByClassName('modal')[0]);
    document.getElementsByTagName('body')[0].removeAttribute('class');
  }

  function suntimes() {
    _hammer_tpModal();
  }

  function usatoday() {
    document.getElementsByTagName('html')[0].removeAttribute('style');
    document.getElementsByTagName('body')[0].removeAttribute('style');
    _getDivsByClassPrefix('sp_message').forEach(div => _removeElement(div));
    _getDivsByClassPrefix('sp_veil').forEach(div => _removeElement(div));
  }

  function washingtonpost() {
    Array.from(document.getElementsByClassName('fixed')).forEach(_removeElement);
    document.getElementsByTagName('html')[0].removeAttribute('style');
    document.getElementsByTagName('body')[0].removeAttribute('style');
  }

  const hostmap = {
    'apnews.com': apnews,
    'www.bloomberg.com': bloomberg,
    'www.businessinsider.com': businessinsider,
    'www.chicagotribune.com': chicagotribune,
    'www.forbes.com': forbes,
    'foreignpolicy.com': foreignpolicy,
    'www.latimes.com': latimes,
    'www.miamiherald.com': miamiherald,
    'www.nytimes.com': nytimes,
    'www.realclearpolitics.com': realclearpolitics,
    'chicago.suntimes.com': suntimes,
    'www.usatoday.com': usatoday,
    'www.washingtonpost.com': washingtonpost,
  };

  const func = hostmap[window.location.hostname];

  if(func) {
    console.log(`Running script for ${window.location.hostname}`);
    func()
  } else {
    console.log(`No script for ${window.location.hostname}`);
  }
})();

