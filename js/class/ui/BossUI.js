
CANDY.BossUI = {
  
  init: function() {
    this.el = document.getElementById('boss-ui');
    this.bar = document.querySelectorAll('#boss-ui .bar')[0];
    this.name = document.querySelectorAll('#boss-ui .name')[0];
  },

  show: function() {
    this.el.classList.add('show');
  },

  hide: function() {
    this.el.classList.remove('show');
  },

  majBar: function(percent) {
    this.bar.style.width = percent+'%'
  }

}
