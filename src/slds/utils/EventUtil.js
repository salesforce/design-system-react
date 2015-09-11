module.exports = {
  trapEvent(event){
    event.preventDefault();
    event.stopPropagation();
  }
}