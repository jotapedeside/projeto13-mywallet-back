import {stripHtml} from 'string-strip-html';

export default function sanitize(str){
  const sanitize = stripHtml(str).result;
  return sanitize
}