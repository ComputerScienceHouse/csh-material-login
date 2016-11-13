export default class ClassUtil {
  static addClass(element, classToAdd) {
    element.className = element.className + ' ' + classToAdd;
  }

  static removeClass(element, classToRemove) {
    element.className = element.className.replace(
      new RegExp('(?:^|\\s)' + classToRemove + '(?!\\S)'),
      ''
    );
  }
}
