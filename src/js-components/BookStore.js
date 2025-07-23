export default class BookStore {
  static storedBooks =
    JSON.parse(localStorage.getItem('savedLocalBooks')) || [];

  static saveBook() {
    localStorage.setItem('savedLocalBooks', JSON.stringify(this.storedBooks));
  }

  static deleteAllBook() {
    localStorage.removeItem('savedLocalBooks');
    this.storedBooks = [];
  }
}
