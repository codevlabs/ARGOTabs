var Backbone = require('../shims/backbone');

var MainView = Backbone.View.extend({
  render: function () {
    this.$el.html('<div class="scrollable layout-page"><div class="scrollable-content"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tortor odio, dignissim sed ligula eu, aliquet sagittis ipsum. Nullam blandit commodo mi et pretium. In nec tortor semper, semper odio venenatis, ornare odio. Cras justo erat, dapibus sit amet vulputate quis, mollis sit amet orci. In placerat nisl ac ante sagittis viverra ac non nisi. Nullam dignissim at lacus et fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper vulputate dui, nec condimentum nunc auctor at. Vivamus orci erat, vulputate vitae dui ut, vulputate aliquam ante. Sed at mollis libero. Ut cursus posuere sem, quis volutpat turpis tempus et. Donec libero lacus, gravida quis justo vitae, ultrices interdum ligula. Fusce tempor nunc sem, eget ultrices sem dignissim eu. Etiam dapibus at felis ut aliquet. Aliquam erat volutpat. Sed congue eleifend tellus.</p></div></div>');
  }
});

module.exports = MainView;
