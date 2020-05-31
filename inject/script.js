
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

    //fixme (console API):
    //getEventListeners(window).scroll.forEach(e => window.removeEventListener('scroll', e.listener));
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
    func()
  } else {
    console.error(`No script for ${window.location.hostname}`);
  }
})();

