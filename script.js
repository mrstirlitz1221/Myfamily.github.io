(function(){
  var views = Array.from(document.querySelectorAll('.view'));

  function idFor(person){ return person ? 'view-' + person : 'view-tree'; }

  function applyState(id){
    views.forEach(function(v){ v.classList.toggle('active', v.id === id); });
    var el = document.getElementById(id);
    document.title = el && el.dataset.title ? el.dataset.title : 'Семья Евграфовых';
    var glow = el && el.querySelector('.glow');
    // re-trigger the lamp animation only on the home tree view
  }

  function go(person, push){
    var id = idFor(person);
    var doSwap = function(){ applyState(id); };
    if(document.startViewTransition){
      document.startViewTransition(doSwap);
    } else {
      doSwap();
    }
    if(push !== false){
      var hash = person ? '#' + person : '#';
      history.pushState({person:person||null}, '', hash);
    }
  }

  document.querySelectorAll('[data-person]').forEach(function(btn){
    btn.addEventListener('click', function(){ go(btn.dataset.person); });
  });
  document.querySelectorAll('[data-back]').forEach(function(btn){
    btn.addEventListener('click', function(){ go(null); });
  });

  window.addEventListener('popstate', function(e){
    var person = e.state && e.state.person ? e.state.person : (location.hash ? location.hash.slice(1) : null);
    applyState(idFor(person));
  });

  // initial route from hash, so each person has their own linkable page
  var initial = location.hash ? location.hash.slice(1) : null;
  var validIds = ['dmitry','larisa','tamara','maxim'];
  if(initial && validIds.indexOf(initial) !== -1){
    applyState(idFor(initial));
  }
})();
