class Message {
  private static lastId: number = 0;

  private _id: number;
  private _creator: string;
  private _content: string;
  private _timestamp: Date;

  constructor(creator: string, content: string) {
    Message.lastId++;
    this._id = Message.lastId;
    this._creator = creator;
    this._content = content;
    this._timestamp = new Date();
  }

  get id(): number {
    return this._id;
  }

  get creator(): string {
    return this._creator;
  }

  set creator(creator: string) {
    this._creator = creator;
  }

  get content(): string {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  set timestamp(timestamp: Date) {
    this._timestamp = timestamp;
  }
}

export default Message;
