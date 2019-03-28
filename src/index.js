import U from './Util'
import * as fn from './core';
U.extend(
  U,
  fn
)
U.extend(U.fn)
window.U = U
export { U }
