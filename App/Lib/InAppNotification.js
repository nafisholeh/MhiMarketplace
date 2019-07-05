type AlertType = 'info' | 'warn' | 'error' | 'success'

const errorTitleDefault = 'Terjadi kesalahan';
const errorBodyDefault = 'Maaf, terjadi kesalahan saat menghubungi server, silahkan coba lagi';
const errorDefTitleDefault = 'Terjadi kesalahan';
const errorDefBodyDefault = 'Maaf, terjadi kesalahan pada aplikasi';

export type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void
}

export class InAppNotification {
  static dropDown: DropdownType

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown
  }
  
  static info(title: string, message: string) {
    if(!this.dropDown || !title || !message) return;
    this.dropDown.alertWithType(
      'info',
      title || errorTitleDefault,
      message || errorBodyDefault
    );
  }

  static error(title: string, message: string) {
    let body = null
    if(message) {
      if(message.hasOwnProperty('graphQLErrors')) {
        const { graphQLErrors } = message || {};
        if(graphQLErrors) {
          body = graphQLErrors[0].message
        }
      } else if(message.hasOwnProperty('message')) {
        const { message: info = '' } = message;
        body = info
      } else {
        body = message
      }
    }
    if(!this.dropDown) return;
    this.dropDown.alertWithType(
      'error',
      title || errorTitleDefault,
      body || errorBodyDefault
    );
  }
  
  static errorLocal(title: string, message: string) {
    if(!this.dropDown) return;
    this.dropDown.alertWithType(
      'error',
      title || errorDefTitleDefault,
      message || errorDefBodyDefault
    );
  }
}
