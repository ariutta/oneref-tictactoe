/**
 * Representation of Cell using Immutable.js
 */
'use strict';

import * as Immutable from 'immutable';

/* auxiliary function to generate a fresh id */
function genID() { 
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36); 
}

/**
 * An individual cell in the matrix as an Immutable record
 */
export default class Cell extends Immutable.Record({
  id: '',
  complete: false,
  text: ''
}) {
  constructor(text, complete = false) {
    super({id: genID(), text, complete});
  }
}
