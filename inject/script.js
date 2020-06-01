
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

  function businessinsider() {
    _removeElement(document.getElementsByClassName('tp-modal')[0]);
    _removeElement(document.getElementsByClassName('tp-backdrop')[0]);
    document.getElementsByTagName('body')[0].removeAttribute('class');
  }

  function forbes() {
    _removeElement(document.getElementsByClassName('fbs-auth__adblock')[0]);
    document.getElementsByTagName('body')[0].removeAttribute('class');
  }

  function latimes() {
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

  function usatoday() {
    document.getElementsByTagName('html')[0].removeAttribute('style');
    document.getElementsByTagName('body')[0].removeAttribute('style');
    _getDivsByClassPrefix('sp_message').forEach(div => _removeElement(div));
    _getDivsByClassPrefix('sp_veil').forEach(div => _removeElement(div));
  }

  const hostmap = {
    'www.businessinsider.com': businessinsider,
    'www.forbes.com': forbes,
    'www.latimes.com': latimes,
    'www.usatoday.com': usatoday,
  };

  const func = hostmap[window.location.hostname];

  if(func) {
    console.log(`Running script for ${window.location.hostname}`);
    func()
  } else {
    console.error(`No script for ${window.location.hostname}`);
  }
})();

