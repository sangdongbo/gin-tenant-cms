// Extend menu
class NicknameMenu {
  title: string;
  tag: string;
  constructor() {
    this.title = '插入用户姓名';
    this.tag = 'button';
  }
  getValue() {
    return '${nickname}'
  }
  isActive() {
    return false;
  }
  isDisabled() {
    return false;
  }
  exec(editor: any, value: any) {
    editor.insertText(value)
  }
}
const insertNickname: any = {
  key: 'insertNickname',
  factory() {
    return new NicknameMenu()
  }
};


export {
  insertNickname,
}
