import 'dart:html' as html;
import 'dart:math' as Math;

/// Class constructor for Slider WSK component.
/// Implements WSK component design pattern defined at:
/// https://github.com/jasonmayes/wsk-component-design-pattern
/// @param {HTMLElement} element The element that will be upgraded.
class MaterialSlider {

    final element;

    MaterialSlider(this.element);

  // Browser feature detection.
  _isIE = window.navigator.msPointerEnabled;
  // Initialize instance.
  init();
}

/// Store constants in one place so they can be updated easily.
/// @enum {string | number}
class _MaterialSliderConstant {
  // None for now.
}

/// Store strings for class names defined by this component that are used in
/// JavaScript. This allows us to simply change it in one place should we
/// decide to modify at a later date.
/// @enum {string}
class _MaterialSliderCssClasses {
    final String IE_CONTAINER = 'wsk-slider__ie-container';
    final String SLIDER_CONTAINER = 'wsk-slider__container';
    final String BACKGROUND_FLEX = 'wsk-slider__background-flex';
    final String BACKGROUND_LOWER = 'wsk-slider__background-lower';
    final String BACKGROUND_UPPER = 'wsk-slider__background-upper';
    final String IS_LOWEST_VALUE = 'is-lowest-value';
    final String IS_UPGRADED = 'is-upgraded';
}

/// Handle input on element.
/// @param {Event} event The event that fired.
/// MaterialSlider.prototype.onInput_ = function(event) {
void _onInput(final html.Event event) {

  _updateValueStyles();
}

/// Handle change on element.
/// @param {Event} event The event that fired.
/// MaterialSlider.prototype.onChange_ = function(event) {
void _onChange(final html.Event event) {

  _updateValueStyles();
}

/// Handle mouseup on element.
/// @param {Event} event The event that fired.
/// MaterialSlider.prototype.onMouseUp_ = function(event) {
void _onMouseUp(final html.Event event) {

  event.target.blur();
}

/// Handle updating of values.
/// @param {Event} event The event that fired.
/// MaterialSlider.prototype.updateValueStyles_ = function(event) {
void _updateValueStyles(final html.Event event) {

  // Calculate and apply percentages to div structure behind slider.

  final fraction = (element.value - element.min) /
      (element.max - element.min);

  if (fraction == 0) {
    element.classes.add(_cssClasses.IS_LOWEST_VALUE);

  } else {
    element.classes.remove(_cssClasses.IS_LOWEST_VALUE);
  }

  if (!_isIE) {
    _backgroundLower.style.flex = fraction;
    _backgroundLower.style.webkitFlex = fraction;
    _backgroundUpper.style.flex = 1 - fraction;
    _backgroundUpper.style.webkitFlex = 1 - fraction;
  }
}

// Public methods.

/// Disable slider.
/// @public
/// MaterialSlider.prototype.disable = /*function*/ () {
void disable() {

  element.disabled = true;
}

/// Enable slider.
/// @public
/// MaterialSlider.prototype.enable = /*function*/ () {
void enable() {

  element.disabled = false;
}

/// Update slider value.
/// @param {Number} value The value to which to set the control (optional).
/// @public
/// MaterialSlider.prototype.change = function(value) {
void change(final value) {

  if (value) {
    element.value = value;
  }
  _updateValueStyles();
}

/// Initialize element.
/// MaterialSlider.prototype.init = /*function*/ () {
void init() {

  if (element != null) {
    if (_isIE) {
      // Since we need to specify a very large height in IE due to
      // implementation limitations, we add a parent here that trims it down to
      // a reasonable size.

      final containerIE = new html.DivElement();
      containerIE.classes.add(_cssClasses.IE_CONTAINER);
      element.parent.insertBefore(containerIE, element);
      element.parent.removeChild(element);
      containerIE.append(element);

    } else {
      // For non-IE browsers, we need a div structure that sits behind the
      // slider and allows us to style the left and right sides of it with
      // different colors.

      final container = new html.DivElement();
      container.classes.add(_cssClasses.SLIDER_CONTAINER);
      element.parent.insertBefore(container, element);
      element.parent.removeChild(element);
      container.append(element);

      final backgroundFlex = new html.DivElement();
      backgroundFlex.classes.add(_cssClasses.BACKGROUND_FLEX);
      container.append(backgroundFlex);

      _backgroundLower = new html.DivElement();
      _backgroundLower.classes.add(_cssClasses.BACKGROUND_LOWER);
      backgroundFlex.append(_backgroundLower);

      _backgroundUpper = new html.DivElement();
      _backgroundUpper.classes.add(_cssClasses.BACKGROUND_UPPER);
      backgroundFlex.append(_backgroundUpper);
    }

    element.addEventListener('input', _onInput);

	// .addEventListener('change', -- .onChange.listen(<Event>);
    element.onChange.listen( _onChange);

	// .addEventListener('mouseup', -- .onMouseUp.listen(<MouseEvent>);
    element.onMouseUp.listen( _onMouseUp);

    _updateValueStyles();
    element.classes.add(_cssClasses.IS_UPGRADED);
  }
}

// The component registers itself. It can assume componentHandler is available
// // in the global scope.

// componentHandler.register({
//   constructor: MaterialSlider,
//   classAsString: 'MaterialSlider',
//   cssClass: 'wsk-js-slider'
// });