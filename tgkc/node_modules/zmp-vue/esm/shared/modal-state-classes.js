export var modalStateClasses = function modalStateClasses(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      isOpened = _ref.isOpened,
      isClosing = _ref.isClosing;

  return {
    'modal-in': isOpened && !isClosing,
    'modal-out': isClosing
  };
};