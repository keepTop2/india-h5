export interface Message {
  /*消息Id */
  targetId: string;

  /*通知类型(1=公告、2=消息) */
  noticeType: number;

  /*通知标题 */
  noticeTitleI18nCode: string;

  /*通知消息内容 */
  messageContentI18nCode: string;

  /*阅读状态，0=未读、1=已读 */
  readState: number;

  /*创建时间 */
  createdTime: number;

  /*创建时间 */
  createdTimeStr: string;
}