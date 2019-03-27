import U from './Util'
import * as fn from './UtilFn';
U.extend(
  U,
  fn
)
U.extend(U.fn)
window.U = U
export { U }
