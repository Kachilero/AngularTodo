/* tslint: disable */
/**
 * Main Class
 */
/* tslint: enable */

export class Todo {
  id: number;
  title: string = '';
  complete: boolean = false;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
