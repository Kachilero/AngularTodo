/* tslint: disable */
/**
 * Main Class
 */
/* tslint: enable */

export class Todo {
  id: number;
  title = '';
  complete = false;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
